import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { environment } from '../environments/environment';
import {
  LcuLowCodeUnitModule,
  LcuLowCodeUnitManageElementComponent,
  SELECTOR_LCU_LOWCODEUNIT_MANAGE_ELEMENT,
} from '@iot-ensemble/lcu-lowcodeunit-common';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule.forRoot(),
    LcuLowCodeUnitModule.forRoot(),
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment),
    },
  ],
  exports: [LcuLowCodeUnitModule],
})
export class AppModule implements DoBootstrap {
  constructor(protected injector: Injector) {}

  public ngDoBootstrap() {
    const manage = createCustomElement(LcuLowCodeUnitManageElementComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_LOWCODEUNIT_MANAGE_ELEMENT, manage);
  }
}
