import {
  Component,
  OnInit,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { IoTEnsembleState } from './../../state/iot-ensemble.state';
import { IoTEnsembleStateContext } from './../../state/iot-ensemble-state.context';

declare var freeboard: any;

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
  implements OnChanges, OnInit, AfterViewInit {
  //  Fields

  //  Properties
  public ConnectedDevicesDisplayedColumns: string[] = ['deviceId', 'connStr'];

  public EmulatedEnabledText: string;

  @Input('state')
  public State: IoTEnsembleState;

  @Output('toggle-emulated-enabled')
  public ToggleEmulatedEnabled: EventEmitter<boolean>;

  @ViewChild('emulatedEnabled')
  public EmulatedEnabledToggle: MatSlideToggle;

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);

    this.ToggleEmulatedEnabled = new EventEmitter();
  }

  //  Life Cycle
  public ngAfterViewInit() {
    // this.setupFreeboard();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.State) {
      this.handleStateChanged();
    }
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  //  API Methods
  public ToggleEmulatedEnabledChanged(event: MatSlideToggleChange) {
    this.ToggleEmulatedEnabled.emit(this.State.Emulated.Enabled);

    this.establishEmulatedEnabledText();
  }

  //  Helpers
  protected establishEmulatedEnabledText() {
    if (this.State.Emulated) {
      this.EmulatedEnabledText = this.State.Emulated.Enabled
        ? 'Enabled'
        : 'Disabled';

      if (
        this.EmulatedEnabledToggle &&
        ((this.EmulatedEnabledToggle.checked &&
          this.EmulatedEnabledText !== 'Enabled') ||
          (!this.EmulatedEnabledToggle.checked &&
            this.EmulatedEnabledText !== 'Disabled'))
      ) {
        this.EmulatedEnabledText = 'Saving...';
      }
    }
  }

  protected handleStateChanged() {
    this.establishEmulatedEnabledText();
  }

  protected setupFreeboard() {
    if (this.State.Dashboard.FreeboardConfig) {
      freeboard.initialize(true);

      freeboard.loadDashboard(this.State.Dashboard.FreeboardConfig, () => {
        freeboard.setEditing(false);
      });
    }
  }
}
