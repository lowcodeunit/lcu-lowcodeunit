import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {
  IoTEnsembleState,
  IoTEnsembleStateContext,
  BreakpointUtils,
  IoTEnsembleDeviceEnrollment
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

  public RevokeDeviceEnrollment(deviceId: string) {
    this.State.Loading = true;

    this.iotEnsCtxt.RevokeDeviceEnrollment(deviceId);
  }

  public ToggleTelemetryEnabled() {
    this.iotEnsCtxt.ToggleTelemetrySync();
  }

  public ToggleEmulatedEnabled() {
    this.iotEnsCtxt.ToggleEmulatedEnabled();
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
