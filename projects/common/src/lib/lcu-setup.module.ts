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
import { TelemetryListComponent } from './elements/controls/telemetry-list/telemetry-list.component';
import { EnabledToggleComponent } from './controls/enabled-toggle/enabled-toggle.component';
import { DevicesTableComponent } from './elements/controls/devices-table/devices-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RefreshSelectComponent } from './controls/refresh-select/refresh-select.component';

@NgModule({
  declarations: [
    LcuSetupManageElementComponent,
    LcuSetupAdminElementComponent,
    LcuSetupDevicesElementComponent,
    LcuSetupSetupElementComponent,
    LoaderComponent,
    TelemetryListComponent,
    EnabledToggleComponent,
    DevicesTableComponent,
    RefreshSelectComponent,
  ],
  imports: [
    FathymSharedModule,
    BrowserAnimationsModule,
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
    TelemetryListComponent,
    EnabledToggleComponent,
    DevicesTableComponent,
    RefreshSelectComponent,
  ],
  entryComponents: [
    LcuSetupManageElementComponent,
    LcuSetupAdminElementComponent,
    LcuSetupDevicesElementComponent,
    LcuSetupSetupElementComponent,
    RefreshSelectComponent,
  ],
})
export class LcuSetupModule {
  static forRoot(): ModuleWithProviders<LcuSetupModule> {
    return {
      ngModule: LcuSetupModule,
      providers: [
        IoTEnsembleStateContext,
      ],
    };
  }
}
