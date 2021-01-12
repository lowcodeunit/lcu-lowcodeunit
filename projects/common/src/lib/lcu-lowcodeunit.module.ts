import { GenericModalService } from './services/generic-modal.service';
import { SideNavService } from './services/sidenav.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FathymSharedModule,
  LCUServiceSettings,
  MaterialModule,
  PipeModule,
} from '@lcu/common';
import { LcuLowCodeUnitManageElementComponent } from './elements/manage/manage.component';
import { IoTEnsembleStateContext } from './state/iot-ensemble-state.context';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataGridModule } from '@lowcodeunit/data-grid';

@NgModule({
  declarations: [LcuLowCodeUnitManageElementComponent],
  imports: [
    FathymSharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    DataGridModule,
    PipeModule,
  ],
  exports: [LcuLowCodeUnitManageElementComponent],
  entryComponents: [LcuLowCodeUnitManageElementComponent],
})
export class LcuLowCodeUnitModule {
  static forRoot(): ModuleWithProviders<LcuLowCodeUnitModule> {
    return {
      ngModule: LcuLowCodeUnitModule,
      providers: [IoTEnsembleStateContext, SideNavService, GenericModalService],
    };
  }
}
