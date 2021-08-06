import { Status } from '@lcu/common';
import { logging } from 'protractor';

export class IoTEnsembleState {
  public AccessLicenseType?: string;

  public AccessPlanGroup?: string;

  public Devices?: IoTEnsembleConnectedDevicesConfig;

  public Dashboard?: IoTEnsembleDashboardConfiguration;

  public Drawers?: IoTEnsembleDrawersConfig;

  public Emulated?: EmulatedDeviceInfo;

  public Error?: ErrorContext;

  public HasAccess?: boolean;

  public Loading?: boolean;

  public SelectedDeviceID?: string;

  public Storage?: IoTEnsembleStorageConfiguration;

  public Telemetry?: IoTEnsembleTelemetry;

  public UserEnterpriseLookup?: string;
}

export class EmulatedDeviceInfo {
  public Enabled?: boolean;

  public Loading?: boolean;
}

export class IoTEnsembleDashboardConfiguration {
  public FreeboardConfig?: any;

  public PowerBIConfig?: any;
}

export class ErrorContext {
  public ActionPath?: string;

  public ActionTarget?: string;

  public ActionText?: string;

  public Message?: string;

  public Title?: string;
}

export class IoTEnsembleDeviceEnrollment {
  public DeviceName?: string;
}

export class IoTEnsembleConnectedDevicesConfig {
  public Devices?: IoTEnsembleDeviceInfo[];

  public Loading?: boolean;

  public MaxDevicesCount?: number;

  public Page?: number;

  public PageSize?: number;

  public SASTokens?: { [deviceName: string]: string };
}

export class IoTEnsembleDeviceInfo {
  [prop: string]: any;

  public AuthenticationType?: string;

  public CloudToDeviceMessageCount?: number;

  public ConnectionString?: string;

  public DeviceID?: string;

  public DeviceName?: string;

  public LastStatusUpdate?: Status;
}

export class IoTEnsembleTelemetry {
  public Enabled?: boolean;

  public Loading?: boolean;

  public Page?: number;

  public PageSize?: number;

  public Payloads?: IoTEnsembleTelemetryPayload[];

  public RefreshRate?: number;

  public LastSyncedAt?: string;
}

export class IoTEnsembleTelemetryPayload {
  [prop: string]: any;

  public DeviceData?: { [prop: string]: any };

  public DeviceID?: string;

  public DeviceType?: string;

  public ID?: string;

  public SensorMetadata?: { [prop: string]: any };

  public SensorReadings?: { [prop: string]: any };

  public Timestamp?: Date;

  public TotalPayloads?: number;

  public Version?: string;
}

export class IoTEnsembleDrawersConfig {
  public DetailsActive: boolean;

  public HasBackdrop: boolean;

  public NavActive: boolean;
}

export class IoTEnsembleStorageConfiguration {
  public APIKeys: IoTEnsembleAPIKeyData[];

  public APIOptions: IoTEnsembleAPIOption[];
}

export class IoTEnsembleAPIKeyData {
  public Key: string;

  public KeyName: string;
}

export class IoTEnsembleAPIOption {
  public Description: string;

  public Method: string;

  public Name: string;

  public Path: string;
}

export enum ColdQueryDataTypes {
  Telemetry = 'Telemetry',
  Observations = 'Observations',
  SensorMetadata = 'SensorMetadata',
}

export enum ColdQueryResultTypes {
  CSV = 'CSV',
  JSON = 'JSON',
  JSONLines = 'JSONLines',
}
