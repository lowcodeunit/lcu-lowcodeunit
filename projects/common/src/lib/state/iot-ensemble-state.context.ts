import { Injectable, Injector } from '@angular/core';
import { StateContext } from '@lcu/common';
import { IoTEnsembleDeviceEnrollment, IoTEnsembleState } from './iot-ensemble.state';

@Injectable({
  providedIn: 'root',
})
export class IoTEnsembleStateContext extends StateContext<IoTEnsembleState> {
  // Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  // API Methods
  public EnrollDevice(device: IoTEnsembleDeviceEnrollment): void {
    this.Execute({
      Arguments: {
        Device: device
      },
      Type: 'EnrollDevice',
    });
  }

  public IssueDeviceSASToken(deviceName: string,  expiryInSeconds: number = 0): void {
    this.Execute({
      Arguments: {
        DeviceName: deviceName,
        ExpiryInSeconds: expiryInSeconds
      },
      Type: 'IssueDeviceSASToken',
    });
  }

  public RevokeDeviceEnrollment(deviceId: string): void {
    this.Execute({
      Arguments: {
        DeviceID: deviceId
      },
      Type: 'RevokeDeviceEnrollment',
    });
  }

  public ToggleDetailsPane(): void {
    this.Execute({
      Arguments: {},
      Type: 'ToggleDetailsPane',
    });
  }

  public ToggleEmulatedEnabled(): void {
    this.Execute({
      Arguments: {},
      Type: 'ToggleEmulatedEnabled',
    });
  }

  public ToggleTelemetrySync() {
    this.Execute({
      Arguments: {},
      Type: 'ToggleTelemetrySync',
    });
  }

  public UpdateTelemetrySync(refreshRate: number, pageSize: number) {
    this.Execute({
      Arguments: {
        RefreshRate: refreshRate,
        PageSize: pageSize
      },
      Type: 'UpdateTelemetrySync',
    });
  }

  //  Helpers
  protected defaultValue() {
    return { Loading: true } as IoTEnsembleState;
  }

  protected loadStateKey(): string {
    return 'shared';
  }

  protected loadStateName(): string {
    return 'iotensemble';
  }
}
