import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IoTEnsembleTelemetry } from '../../../state/iot-ensemble.state';
import { IoTEnsembleTelemetryPayload } from './../../../state/iot-ensemble.state';

@Component({
  selector: 'lcu-telemetry-list',
  templateUrl: './telemetry-list.component.html',
  styleUrls: ['./telemetry-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'void',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TelemetryListComponent implements OnChanges, OnInit {
  //  Fields

  //  Properties
  public ActivePayloadID: string;

  @Input('displayed-columns')
  public DisplayedColumns: string[];

  @Output('downloaded')
  public Downloaded: EventEmitter<IoTEnsembleTelemetryPayload>;

  @Input('telemetry')
  public Telemetry: IoTEnsembleTelemetry;

  public TelemetryDataSource: MatTableDataSource<IoTEnsembleTelemetryPayload>;

  //  Constructors
  constructor() {
    this.DisplayedColumns = ['id', 'deviceId', 'processedAt', 'actions'];

    this.Downloaded = new EventEmitter();

    this.Telemetry = { Payloads: [] };

    this.TelemetryDataSource = new MatTableDataSource();
  }

  //  Life Cycle
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.Telemetry) {
      this.updateTelemetryDataSource();
    }
  }

  public ngOnInit(): void {
    this.updateTelemetryDataSource();
  }

  //  API Methods
  public DownloadClick(payload: IoTEnsembleTelemetryPayload) {
    this.Downloaded.emit(payload);
  }

  public IsActivePayload(payload: IoTEnsembleTelemetryPayload): boolean {
    return this.ActivePayloadID && this.ActivePayloadID === payload?.id;
  }

  public SetActivePayload(payload: IoTEnsembleTelemetryPayload) {
    if (this.ActivePayloadID === payload.id) {
      this.ActivePayloadID = null;
    } else {
      this.ActivePayloadID = payload.id;
    }

    this.updateTelemetryDataSource();
  }

  //  Helpers
  protected updateTelemetryDataSource() {
    this.TelemetryDataSource.data = this.Telemetry.Payloads || [];

    this.TelemetryDataSource.data.forEach((payloadAny: any) => {
      payloadAny.$IsExpanded = this.IsActivePayload(payloadAny);

      if (payloadAny.$IsExpanded) {
        console.log(payloadAny);
      }
    });
  }
}
