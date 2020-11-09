import { Status } from '@lcu/common';

export class IoTEnsembleState {
  public Dashboard?: IoTEnsembleDashboardConfiguration;

  public Devices?: IoTEnsembleDeviceInfo[];

  public Drawers?: IoTEnsembleDrawersConfig;

  public Emulated?: EmulatedDeviceInfo;

  public Loading?: boolean;

  public SelectedDeviceID?: string;

  public SelectedDeviceTelemetry?: IoTEnsembleDeviceTelemetry[];

  public Storage?: IoTEnsembleStorageConfiguration[];

  public UserEnterpriseLookup?: string;
}

export class EmulatedDeviceInfo {
  public Enabled: boolean;
}

export class IoTEnsembleDashboardConfiguration {
  public FreeboardConfig: any;

  public PowerBIConfig: any;
}

export class IoTEnsembleDeviceInfo {
  public AuthenticationType?: string;

  public CloudToDeviceMessageCount: number;

  public ConnectionString: string;

  public DeviceID: string;

  public LastStatusUpdate: Status;
}

export class IoTEnsembleDeviceTelemetry {
  public Payload: any;
}

export class IoTEnsembleDrawersConfig {
  public DetailsActive: boolean;

  public HasBackdrop: boolean;

  public NavActive: boolean;
}

export class IoTEnsembleStorageConfiguration {
  public APIKeys: { [keyName: string]: string };
}
