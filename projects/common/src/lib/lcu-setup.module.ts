import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { LcuService } from './services/lcu.service';
import { LcuComponent } from './controls/lcu/lcu.component';
import { LcuDirective } from './directives/lcu.directive';
import { LcuSetupManageElementComponent } from './elements/manage/manage.component';
import { LcuSetupAdminElementComponent } from './elements/admin/admin.component';
import { LcuSetupDevicesElementComponent } from './elements/devices/devices.component';

@NgModule({
  declarations: [LcuComponent, LcuDirective, LcuSetupManageElementComponent, LcuSetupAdminElementComponent, LcuSetupDevicesElementComponent],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [LcuComponent, LcuDirective, LcuSetupManageElementComponent, LcuSetupAdminElementComponent, LcuSetupDevicesElementComponent],
  entryComponents: [LcuSetupManageElementComponent, LcuSetupAdminElementComponent, LcuSetupDevicesElementComponent]
})
export class LcuSetupModule {
  static forRoot(): ModuleWithProviders<LcuSetupModule> {
    return {
      ngModule: LcuSetupModule,
      providers: [LcuService]
    };
  }
}
