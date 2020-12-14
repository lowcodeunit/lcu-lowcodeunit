import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { DataPipeConstants } from '@lcu/common';
import { MatTableDataSource } from '@angular/material/table';
import 
{ 
  ColumnDefinitionModel,
  DataGridConfigModel,
  DataGridFeaturesModel,
  DataGridPaginationModel,
  DynamicComponentModel
} from '@lowcodeunit/data-grid';
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
  protected colunmDefsModel: Array<ColumnDefinitionModel>;

  @Input('displayed-columns')
  public DisplayedColumns: string[];

  @Output('downloaded')
  public Downloaded: EventEmitter<IoTEnsembleTelemetryPayload>;

  public DynamicComponents: Array<DynamicComponentModel>;

  public GridFeatures: DataGridFeaturesModel;

  public GridParameters: DataGridConfigModel
  
  @Output('page-size-changed')
  public PageSizeChanged: EventEmitter<any>;

  @Input('telemetry')
  public Telemetry: IoTEnsembleTelemetry;

  public TelemetryDataSource: MatTableDataSource<IoTEnsembleTelemetryPayload>;

  //  Constructors
  constructor() {

    this.Downloaded = new EventEmitter();

    this.PageSizeChanged = new EventEmitter();

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

    this.setupDynamicComponents();
  }

  //  API Methods
  public DownloadClick(payload: IoTEnsembleTelemetryPayload) {

    this.Downloaded.emit(payload);
  }

  public SetActivePayload(payload: IoTEnsembleTelemetryPayload) {

    payload.$IsExpanded = !payload.$IsExpanded;
   this.updateTelemetryDataSource();
  }

  public HandlePageEvent(event: any): void{
    console.log("page event t-list: ", event);
    this.PageSizeChanged.emit(event.pageSize)

  }

  //  Helpers
  protected updateTelemetryDataSource() {

    if (this.Telemetry) {
      this.TelemetryDataSource.data = this.Telemetry.Payloads || [];

      this.setupGrid();
    }
  }

    /**
     * Setup dynamic components to inject into datagrid
     */
    protected setupDynamicComponents(): void {

      this.DynamicComponents = [
        new DynamicComponentModel(
          {
            Component: PayloadComponent,
            Data: {},
            Label: 'JSON Payload'
          })
      ];
    }

    /**
     * Setup all features of the grid
     */
    protected setupGrid(): void {

      this.setupGridParameters();

      this.GridParameters = new DataGridConfigModel(
        of(this.TelemetryDataSource.data),
        this.colunmDefsModel,
        this.GridFeatures
      )
    };

    /**
     * Create grid columns
     */
    protected setupGridParameters(): void {
      this.colunmDefsModel = [
        new ColumnDefinitionModel(
          {
            ColType: 'id',
            Title: 'ID',
            ShowValue: true
          }),
        new ColumnDefinitionModel(
          {
            ColType: 'DeviceID',
            Title: 'Device ID',
            ShowValue: true
          }),
        new ColumnDefinitionModel(
          {
            ColType: 'EventProcessedUtcTime',
            Title: 'Processed At',
            ShowValue: true,
            Pipe: DataPipeConstants.DATE_TIME_ZONE_FMT
          }),
        new ColumnDefinitionModel({
          ColType: 'view', // TODO: allow no ColTypes, without setting some random value - shannon
          Title: '', // TODO: allow no Titles, without setting '' - shannon
          ShowValue: false,
          ShowIcon: true,
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
        new ColumnDefinitionModel(
          {
            ColType: 'download',
            Title: '',
            ShowValue: false,
            ShowIcon: true,
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
      const paginationDetails: DataGridPaginationModel = new DataGridPaginationModel(
        {
          PageSize: 10,
          PageSizeOptions: [1, 5, 10, 20, 30]
        }
      );

      const features: DataGridFeaturesModel = new DataGridFeaturesModel(
        {
          Paginator: paginationDetails,
          Filter: false,
          ShowLoader: true,
          RowColorEven: 'gray',
          RowColorOdd: 'light-gray'
        }
      );

      this.GridFeatures = features;
    }
}
