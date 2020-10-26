import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { environment } from '../environments/environment';
import { LcuSetupModule, LcuSetupManageElementComponent, SELECTOR_LCU_SETUP_MANAGE_ELEMENT } from '@iot-ensemble/lcu-setup-common';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    LcuSetupModule.forRoot()
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }
  ],
  exports: [LcuSetupModule]
})
export class AppModule implements DoBootstrap {
	constructor(protected injector: Injector) {}

	public ngDoBootstrap() {
		const manage = createCustomElement(LcuSetupManageElementComponent, { injector: this.injector });

		customElements.define(SELECTOR_LCU_SETUP_MANAGE_ELEMENT, manage);
	}
}
