import { Component, Input, OnInit } from '@angular/core';
import { IoTEnsembleTelemetryPayload } from '../../../state/iot-ensemble.state';

@Component({
  selector: 'lcu-payload',
  templateUrl: './payload.component.html',
  styleUrls: ['./payload.component.scss']
})
export class PayloadComponent implements OnInit {

  private _datasource: IoTEnsembleTelemetryPayload;
  // tslint:disable-next-line:no-input-rename
  @Input('datasource')
  set DataSource(val: IoTEnsembleTelemetryPayload) {
    debugger;
    this._datasource = val;
  }

  get DataSource(): IoTEnsembleTelemetryPayload {
    return this._datasource;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
