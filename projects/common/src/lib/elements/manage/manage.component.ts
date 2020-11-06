import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { IoTEnsembleState } from './../../state/iot-ensemble.state';
import { IoTEnsembleStateContext } from './../../state/iot-ensemble-state.context';

export class LcuSetupManageElementState {}

export class LcuSetupManageContext extends LCUElementContext<
  LcuSetupManageElementState
> {}

export const SELECTOR_LCU_SETUP_MANAGE_ELEMENT = 'lcu-setup-manage-element';

@Component({
  selector: SELECTOR_LCU_SETUP_MANAGE_ELEMENT,
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class LcuSetupManageElementComponent
  extends LcuElementComponent<LcuSetupManageContext>
  implements OnInit {
  //  Fields

  //  Properties
  public State: IoTEnsembleState;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected iotEns: IoTEnsembleStateContext
  ) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.iotEns.Context.subscribe((state) => {
      this.State = state;

      this.handleStateChanged();
    });
  }

  //  API Methods

  //  Helpers
  protected handleStateChanged() {}
}
