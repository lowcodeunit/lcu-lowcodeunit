import { Status } from '@lcu/common';

export class IoTEnsembleState {
  public Dashboard?: IoTEnsembleDashboardConfiguration;

  public Devices?: IoTEnsembleDeviceInfo[];

  public DeviceTelemetry?: IoTEnsembleDeviceTelemetry;

  public Drawers?: IoTEnsembleDrawersConfig;

  public Emulated?: EmulatedDeviceInfo;

  public Loading?: boolean;

  public SelectedDeviceID?: string;

  public Storage?: IoTEnsembleStorageConfiguration[];

  public UserEnterpriseLookup?: string;
}

export class EmulatedDeviceInfo {
  public Enabled?: boolean;
}

export class IoTEnsembleDashboardConfiguration {
  public FreeboardConfig?: any;

  public PowerBIConfig?: any;
}

export class IoTEnsembleDeviceEnrollment {
  public DeviceName?: string;
}

export class IoTEnsembleDeviceInfo {
  public AuthenticationType?: string;

  public CloudToDeviceMessageCount?: number;

  public ConnectionString?: string;

  public DeviceID?: string;

  public DeviceName?: string;

  public LastStatusUpdate?: Status;
}

export class IoTEnsembleDeviceTelemetry {
  public Payloads?: IoTEnsembleDeviceTelemetryPayload[];

  public RefreshRate?: number;
}

export class IoTEnsembleDeviceTelemetryPayload {
  [prop: string]: any;

  public DeviceData?: { [prop: string]: any };

  public DeviceID?: string;

  public DeviceType?: string;

  public ID?: string;

  public SensorMetadata?: { [prop: string]: any };

  public SensorReadings?: { [prop: string]: any };

  public Timestamp?: Date;

  public Version?: string;
}

export class IoTEnsembleDrawersConfig {
  public DetailsActive: boolean;

  public HasBackdrop: boolean;

  public NavActive: boolean;
}

export class IoTEnsembleStorageConfiguration {
  public APIKeys: { [keyName: string]: string };
}
