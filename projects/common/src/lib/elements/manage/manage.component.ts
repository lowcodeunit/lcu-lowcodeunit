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
import {
  IoTEnsembleState,
  IoTEnsembleDeviceInfo,
  IoTEnsembleDeviceEnrollment,
} from './../../state/iot-ensemble.state';
import { IoTEnsembleStateContext } from './../../state/iot-ensemble-state.context';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public AddDeviceFormGroup: FormGroup;

  public AddingDevice: boolean;

  public ConnectedDevicesDisplayedColumns: string[];

  public DashboardIFrameURL: SafeResourceUrl;

  public EmulatedEnabledText: string;

  @ViewChild('emulatedEnabled')
  public EmulatedEnabledToggle: MatSlideToggle;

  @Output('enroll-device')
  public EnrollDevice: EventEmitter<IoTEnsembleDeviceEnrollment>;

  @Output('revoke-device-enrollment')
  public RevokeDeviceEnrollment: EventEmitter<string>;

  @Input('state')
  public State: IoTEnsembleState;

  @Output('toggle-emulated-enabled')
  public ToggleEmulatedEnabled: EventEmitter<boolean>;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    protected formBldr: FormBuilder
  ) {
    super(injector);

    this.ConnectedDevicesDisplayedColumns = [
      'deviceName',
      'enabled',
      'lastUpdate',
      'connStr',
      'actions',
    ];

    this.EnrollDevice = new EventEmitter();

    this.RevokeDeviceEnrollment = new EventEmitter();

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

    this.setupAddDeviceForm();

    this.setDashboardIFrameURL();
  }

  //  API Methods
  public EnrollDeviceSubmit() {
    this.EnrollDevice.emit({
      DeviceName: this.AddDeviceFormGroup.controls.deviceName.value,
    });
  }

  public RevokeDeviceEnrollmentClick(device: IoTEnsembleDeviceInfo) {
    if (confirm(`Are you sure you want to remove device '${device.DeviceName}'?`)) {
      this.RevokeDeviceEnrollment.emit(device.DeviceID);
    }
  }

  public ToggleAddingDevice() {
    this.AddingDevice = !this.AddingDevice;
  }

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

    this.setAddingDevice();

    this.setupFreeboard();
  }

  public setAddingDevice() {
    this.AddingDevice = (this.State.Devices?.length || 0) <= 0;
  }

  protected setDashboardIFrameURL() {
    const source = this.State.Dashboard?.FreeboardConfig
      ? JSON.stringify(this.State.Dashboard?.FreeboardConfig)
      : '';

    this.DashboardIFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://fathym.fathym-it.com/freeboard?source=${source}`
    );
  }

  protected setupAddDeviceForm() {
    this.AddDeviceFormGroup = this.formBldr.group({
      deviceName: ['', Validators.required],
    });
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
