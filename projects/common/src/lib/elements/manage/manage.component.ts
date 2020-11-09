import {
  Component,
  OnInit,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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
  implements OnChanges, OnInit {
  //  Fields

  //  Properties
  public DashboardIFrameHeight: string;

  @Input('state')
  public State: IoTEnsembleState;

  @Output('toggle-emulated-enabled')
  public ToggleEmulatedEnabled: EventEmitter<boolean>;

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);

    this.ToggleEmulatedEnabled = new EventEmitter();
  }

  //  Life Cycle
  public ngOnChanges(changes: SimpleChanges) {
    if (changes.State) {
      this.handleStateChanged();
    }
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  //  API Methods
  public ResizeDashboardIFrame(iframe: any) {
    this.DashboardIFrameHeight = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
  }

  public ToggleEmulatedEnabledChanged(event: MatSlideToggleChange) {
    this.ToggleEmulatedEnabled.emit(this.State.Emulated.Enabled);
  }

  //  Helpers
  protected handleStateChanged() {
    console.log('state-here');
  }
}
