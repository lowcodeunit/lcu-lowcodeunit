import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FathymSharedModule,
  LCUServiceSettings,
  MaterialModule,
} from '@lcu/common';
import { LcuSetupManageElementComponent } from './elements/manage/manage.component';
import { LcuSetupAdminElementComponent } from './elements/admin/admin.component';
import { LcuSetupDevicesElementComponent } from './elements/devices/devices.component';
import { LcuSetupSetupElementComponent } from './elements/setup/setup.component';
import { IoTEnsembleStateContext } from './state/iot-ensemble-state.context';
import { LoaderComponent } from './controls/loader/loader.component';

@NgModule({
  declarations: [
    LcuSetupManageElementComponent,
    LcuSetupAdminElementComponent,
    LcuSetupDevicesElementComponent,
    LcuSetupSetupElementComponent,
    LoaderComponent,
  ],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    LcuSetupManageElementComponent,
    LcuSetupAdminElementComponent,
    LcuSetupDevicesElementComponent,
    LcuSetupSetupElementComponent,
    LoaderComponent,
  ],
  entryComponents: [
    LcuSetupManageElementComponent,
    LcuSetupAdminElementComponent,
    LcuSetupDevicesElementComponent,
    LcuSetupSetupElementComponent,
  ],
})
export class LcuSetupModule {
  static forRoot(env: {
    production: boolean;
  }): ModuleWithProviders<LcuSetupModule> {
    return {
      ngModule: LcuSetupModule,
      providers: [
        IoTEnsembleStateContext,
        {
          provide: LCUServiceSettings,
          useValue: FathymSharedModule.DefaultServiceSettings(env),
        },
      ],
    };
  }
}
