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
  AfterContentInit,
  SecurityContext,
} from '@angular/core';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { IoTEnsembleState } from './../../state/iot-ensemble.state';
import { IoTEnsembleStateContext } from './../../state/iot-ensemble-state.context';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  implements OnChanges, OnInit, AfterViewInit, AfterContentInit {
  //  Fields

  //  Properties
  public ConnectedDevicesDisplayedColumns: string[] = [
    'deviceId',
    'enabled',
    'lastUpdate',
    'connStr',
  ];

  public DashboardIFrameURL: SafeResourceUrl;

  public EmulatedEnabledText: string;

  @ViewChild('emulatedEnabled')
  public EmulatedEnabledToggle: MatSlideToggle;

  @Input('state')
  public State: IoTEnsembleState;

  @Output('toggle-emulated-enabled')
  public ToggleEmulatedEnabled: EventEmitter<boolean>;

  //  Constructors
  constructor(protected injector: Injector, protected sanitizer: DomSanitizer) {
    super(injector);

    this.ToggleEmulatedEnabled = new EventEmitter();
  }

  //  Life Cycle
  public ngAfterContentInit() {
    // this.setupFreeboard();
  }

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

    this.setDashboardIFrameURL();
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

    this.setupFreeboard();
  }

  public setDashboardIFrameURL() {
    const source = this.State.Dashboard?.FreeboardConfig
      ? JSON.stringify(this.State.Dashboard?.FreeboardConfig)
      : '';

    this.DashboardIFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://fathym.fathym-it.com/freeboard?source=${source}`
    );
  }

  protected setupFreeboard() {
    // if (this.State.Dashboard && this.State.Dashboard.FreeboardConfig) {
    //   // debugger;
    //   // freeboard.initialize(true);
    //   // const dashboard = freeboard.loadDashboard(
    //   //   this.State.Dashboard.FreeboardConfig,
    //   //   () => {
    //   //     freeboard.setEditing(false);
    //   //   }
    //   // );
    //   // console.log(dashboard);
    // }
  }
}
