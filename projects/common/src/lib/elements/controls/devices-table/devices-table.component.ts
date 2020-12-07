import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IoTEnsembleDeviceInfo } from '../../../state/iot-ensemble.state';

@Component({
  selector: 'lcu-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss'],
})
export class DevicesTableComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('devices')
  public Devices?: IoTEnsembleDeviceInfo[];

  @Input('displayed-columns')
  public DisplayedColumns: string[];

  @Output('revoked')
  public Revoked: EventEmitter<string>;

  //  Constructors
  constructor() {
    this.Devices = [];

    this.DisplayedColumns = [
      'deviceName',
      'enabled',
      'lastUpdate',
      'connStr',
      'actions',
    ];

    this.Revoked = new EventEmitter();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public RevokeClick(device: IoTEnsembleDeviceInfo) {
    if (
      confirm(`Are you sure you want to remove device '${device.DeviceName}'?`)
    ) {
      this.Revoked.emit(device.DeviceID);
    }
  }

  //  Helpers
}
