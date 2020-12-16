import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {
  IoTEnsembleState,
  IoTEnsembleStateContext,
  BreakpointUtils,
  IoTEnsembleDeviceEnrollment,
  IoTEnsembleTelemetryPayload
} from '@iot-ensemble/lcu-setup-common';

@Component({
  selector: 'lcu-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
})
export class DynamicComponent implements OnInit {
  //  Fields

  //  Properties
  public IsMobile: boolean;

  public State: IoTEnsembleState;

  //  Constructors
  constructor(
    protected iotEnsCtxt: IoTEnsembleStateContext,
    protected breakpointUtils: BreakpointUtils
  ) {}

  //  Life Cycle
  public ngOnInit(): void {
    this.breakpointUtils.SetupIsMobileObserver((result) =>
      this.handleMobileObserver(result)
    );

    this.setupStateHandler();
  }

  //  API Methods
  public EnrollDevice(device: IoTEnsembleDeviceEnrollment) {
    this.State.Loading = true;

    this.iotEnsCtxt.EnrollDevice(device);
  }

  public IssueDeviceSASToken(deviceName: string) {
    this.State.Loading = true;

    //  TODO:  Pass through expiry time in some way?
    this.iotEnsCtxt.IssueDeviceSASToken(deviceName, 0);
  }

  public RevokeDeviceEnrollment(deviceId: string) {
    this.State.Loading = true;

    this.iotEnsCtxt.RevokeDeviceEnrollment(deviceId);
  }

  public SendDeviceMessage(payload: IoTEnsembleTelemetryPayload) {
    this.State.Loading = true;

    this.iotEnsCtxt.SendDeviceMessage(payload.DeviceID, payload);
  }

  public ToggleTelemetryEnabled() {
    this.iotEnsCtxt.ToggleTelemetrySync();
  }

  public ToggleEmulatedEnabled() {
    this.iotEnsCtxt.ToggleEmulatedEnabled();
  }

  public UpdateDeviceTablePageSize(event: any){
    this.State.Loading = true;

    this.iotEnsCtxt.UpdateConnectedDevicesSync(event);
  }

  public UpdatePageSize(event: any){
    this.State.Loading = true;

    this.iotEnsCtxt.UpdateTelemetrySync(this.State.Telemetry.RefreshRate, event);

  }

  public UpdateRefreshRate(event: number){
    this.State.Loading = true;

    this.iotEnsCtxt.UpdateTelemetrySync(event, this.State.Telemetry.PageSize);
  }

  //  Helpers
  protected handleMobileObserver(result?: BreakpointState) {
    this.IsMobile = result.matches;

    // if (!this.IsMobile && this.NavDrawer) {
    //   this.NavDrawer.open();
    // }
  }

  protected handleStateChanged() {
    console.log(this.State);
  }

  protected setupStateHandler() {
    this.iotEnsCtxt.Context.subscribe((state) => {
      this.State = state;

      this.handleStateChanged();
    });
  }
}
