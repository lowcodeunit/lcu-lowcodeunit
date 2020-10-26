import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuSetupAdminElementState {}

export class LcuSetupAdminContext extends LCUElementContext<LcuSetupAdminElementState> {}

export const SELECTOR_LCU_SETUP_ADMIN_ELEMENT = 'lcu-setup-admin-element';

@Component({
  selector: SELECTOR_LCU_SETUP_ADMIN_ELEMENT,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class LcuSetupAdminElementComponent extends LcuElementComponent<LcuSetupAdminContext> implements OnInit {
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
