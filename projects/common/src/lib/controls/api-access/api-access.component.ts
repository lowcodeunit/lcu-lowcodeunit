import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ClipboardCopyFunction, DataPipeConstants } from '@lcu/common';
import {
  ColumnDefinitionModel,
  DataGridConfigModel,
  DataGridFeaturesModel,
  DataGridPaginationModel,
} from '@lowcodeunit/data-grid';
import { IoTEnsembleAPIKeyData, IoTEnsembleAPIOption } from '../../state/iot-ensemble.state';
import { of } from 'rxjs';

@Component({
  selector: 'lcu-api-access',
  templateUrl: './api-access.component.html',
  styleUrls: ['./api-access.component.scss'],
})
export class ApiAccessComponent implements OnChanges, OnInit {
  //  Fields

  //  Properties
  @Input('api-keys')
  public APIKeys: IoTEnsembleAPIKeyData[];

  @Input('api-options')
  public APIOptions: IoTEnsembleAPIOption[];

  public GridParameters: DataGridConfigModel;

  @Output('regenerated')
  public Regenerated: EventEmitter<string>;

  //  Constructors
  constructor() {
    this.Regenerated = new EventEmitter();
  }

  //  Life Cycle
  public ngOnChanges(simple: SimpleChanges): void {
    if (simple.APIKeys) {
      this.setupGrid();
    }
  }

  public ngOnInit(): void {
    this.setupGrid();
  }

  //  API Methods
  public CopyClick(keyData: any) {
    ClipboardCopyFunction.ClipboardCopy(keyData.Key);

    keyData.$IsCopySuccessIcon = true;

    setTimeout(() => {
      keyData.$IsCopySuccessIcon = false;
    }, 2000);
  }

  public ShowKey(keyData: any) {
    keyData.$ShowKey = !keyData.$ShowKey;
  }

  public Regenerate(keyData: IoTEnsembleAPIKeyData) {
    this.Regenerated.emit(keyData.KeyName);
  }

  //  Helpers
  protected setupGrid(): void {
    const colDefs = this.setupColumnDefs();

    const features = this.setupGridFeatures();

    this.GridParameters = new DataGridConfigModel(
      of(this.APIKeys),
      colDefs,
      features
    );
  }

  protected setupColumnDefs() {
    return [
      new ColumnDefinitionModel({
        ColType: 'KeyName',
        Title: 'Key Name',
        ShowValue: true,
      }),

      new ColumnDefinitionModel({
        ColType: 'Key',
        Title: 'API Key',
        ShowValue: true,
        ShowIcon: true,
      }),

      new ColumnDefinitionModel({
        ColType: 'copy',
        ColWidth: '10px',
        Title: '',
        ShowValue: false,
        ShowIcon: true,
        IconColor: 'yellow-accent-text',
        IconConfigFunc: (keyData: any) => {
          return keyData.$IsCopySuccessIcon ? 'done' : 'content_copy';
        },
        Action: {
          ActionHandler: this.CopyClick.bind(this),
          ActionType: 'button',
          ActionTooltip: 'Copy API Key',
        },
      }),

      new ColumnDefinitionModel({
        ColType: 'show-key',
        ColWidth: '10px',
        Title: '',
        ShowValue: false,
        ShowIcon: true,
        IconColor: 'orange-accent-text',
        IconConfigFunc: (keyData: any) => {
          return keyData.$ShowKey ? 'visibility_off' : 'visibility';
        },
        Action: {
          ActionHandler: this.ShowKey.bind(this),
          ActionType: 'button',
          ActionTooltip: 'ShowKey',
        },
      }),

      new ColumnDefinitionModel({
        ColType: 'regenerate',
        ColWidth: '10px',
        Title: '',
        ShowValue: false,
        ShowIcon: true,
        IconColor: 'blue-accent-text',
        IconConfigFunc: () => 'loop',
        Action: {
          ActionHandler: this.Regenerate.bind(this),
          ActionType: 'button',
          ActionTooltip: 'Revoke',
        },
      }),
    ];
  }

  protected setupGridFeatures() {
    // const paginationDetails = new DataGridPaginationModel({
    //   PageSize: 10,
    //   PageSizeOptions: [5, 10, 25],
    // });

    const features = new DataGridFeaturesModel({
      // Paginator: paginationDetails,
      Filter: false,
      ShowLoader: true,
      RowColorEven: 'gray',
      RowColorOdd: 'light-gray',
    });

    return features;
  }
}
