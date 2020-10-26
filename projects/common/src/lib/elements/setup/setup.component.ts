import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuSetupSetupElementState {}

export class LcuSetupSetupContext extends LCUElementContext<LcuSetupSetupElementState> {}

export const SELECTOR_LCU_SETUP_SETUP_ELEMENT = 'lcu-setup-setup-element';

@Component({
  selector: SELECTOR_LCU_SETUP_SETUP_ELEMENT,
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class LcuSetupSetupElementComponent extends LcuElementComponent<LcuSetupSetupContext> implements OnInit {
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
