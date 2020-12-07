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
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnDefinitionModel, DataGridConfig, DataGridFeatures, DataGridPagination, DynamicComponentModel } from '@lowcodeunit/data-grid';
import { debug } from 'console';
import { of } from 'rxjs/internal/observable/of';
import { IoTEnsembleTelemetry } from '../../../state/iot-ensemble.state';
import { PayloadComponent } from '../../dynamic/payload/payload.component';
import { IoTEnsembleTelemetryPayload } from './../../../state/iot-ensemble.state';

@Component({
  selector: 'lcu-telemetry-list',
  templateUrl: './telemetry-list.component.html',
  styleUrls: ['./telemetry-list.component.scss'],
})
export class TelemetryListComponent implements OnChanges, OnInit {
  //  Fields

  //  Properties

  protected _GridParameters: DataGridConfig;
  public set GridParameters(val: DataGridConfig) {
    this._GridParameters = val;
  }

  public get GridParameters(): DataGridConfig {
    return this. _GridParameters;
  }

  protected _gridFeatures: DataGridFeatures;
  public get gridFeatures(): DataGridFeatures {
    return this._gridFeatures;
  }

  public set gridFeatures(val: DataGridFeatures) {
    this._gridFeatures = val;
  }

  public DynamicComponents: Array<DynamicComponentModel>;

  protected colunmDefsModel: Array<ColumnDefinitionModel>;




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
    // this.updateTelemetryDataSource();
    this.setupDynamicComponents();
    this.setupGrid();
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
    payload.$IsExpanded = !payload.$IsExpanded;
   this.updateTelemetryDataSource();
  }

  //  Helpers
  protected updateTelemetryDataSource() {
    if (this.Telemetry) {
      this.TelemetryDataSource.data = this.Telemetry.Payloads || [];

      // this.TelemetryDataSource.data.forEach((payloadAny: any) => {
      //   payloadAny.$IsExpanded = this.IsActivePayload(payloadAny);
      // });
    }
  }

    /**
     * Setup dynamic components to inject into datagrid
     */
    protected setupDynamicComponents(): void {
      this.DynamicComponents = [
        new DynamicComponentModel({ Component: PayloadComponent,
                                    Data: {},
                                    Label: 'JSON Payload' })
      ];
    }

    /**
     * Setup all features of the grid
     */
    protected setupGrid(): void {
      this.setupGridParameters();
      this.GridParameters = new DataGridConfig(
        of(this.TelemetryDataSource.data),
        this.colunmDefsModel,
        this.gridFeatures
      )
    };

    /**
     * Create grid columns
     */
    protected setupGridParameters(): void {
      this.colunmDefsModel = [
        new ColumnDefinitionModel({ ColType: 'id', Title: 'ID', ShowValue: true}),
        new ColumnDefinitionModel({ ColType: 'DeviceID', Title: 'Device ID', ShowValue: true}),
        new ColumnDefinitionModel({ ColType: 'EventProcessedUtcTime', Title: 'Processed At', ShowValue: true}),
        new ColumnDefinitionModel({ ColType: 'needtoallowfornocolumntypes', Title: '', ShowValue: false, ShowIcon: true,
                                    IconConfigFunc: (rowData: IoTEnsembleTelemetryPayload) => {
                                      return rowData.$IsExpanded ? 'visibility' : 'visibility_off';
                                    },
                                    Action:
                                    {
                                      ActionHandler: this.SetActivePayload.bind(this),
                                      ActionType: 'button',
                                      ActionTooltip: 'View Payload'
                                    }
                                  }),
        new ColumnDefinitionModel({ ColType: 'd', Title: '', ShowValue: false, ShowIcon: true,
                                    IconConfigFunc: () => 'download',
                                    Action:
                                    {
                                      ActionHandler: this.DownloadClick.bind(this),
                                      ActionType: 'button',
                                      ActionTooltip: 'Download'
                                    }
                                  })
      ];

      this.setupGridFeatures();
    }

    /**
     * Setup grid features, such as pagination, row colors, etc.
     */
    protected setupGridFeatures(): void {
      const paginationDetails: DataGridPagination = new DataGridPagination();
      paginationDetails.PageSize = 10;
      paginationDetails.PageSizeOptions = [1, 5, 10, 20, 30];

      const features: DataGridFeatures = new DataGridFeatures();
      features.Paginator = paginationDetails;
      features.Filter = false;
      features.ShowLoader = true;
      features.RowColorEven = 'gray';
      features.RowColorOdd = 'light-gray';

      this.gridFeatures = features;
    }
}
