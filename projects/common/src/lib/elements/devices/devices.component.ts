import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuSetupDevicesElementState {}

export class LcuSetupDevicesContext extends LCUElementContext<LcuSetupDevicesElementState> {}

export const SELECTOR_LCU_SETUP_DEVICES_ELEMENT = 'lcu-setup-devices-element';

@Component({
  selector: SELECTOR_LCU_SETUP_DEVICES_ELEMENT,
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class LcuSetupDevicesElementComponent extends LcuElementComponent<LcuSetupDevicesContext> implements OnInit {
  //  Fields

  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();
  }

  //  API Methods

  //  Helpers
}
