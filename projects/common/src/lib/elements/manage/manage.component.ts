import {
  Component,
  OnInit,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterContentInit,
  OnDestroy,
  ElementRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  ComponentRef,
} from '@angular/core';
import {
  LCUElementContext,
  LcuElementComponent,
  LCUServiceSettings,
  DataPipeConstants,
  PipeModule,
  DataPipes,
} from '@lcu/common';
import {
  IoTEnsembleConnectedDevicesConfig,
  IoTEnsembleDashboardConfiguration,
  EmulatedDeviceInfo,
  IoTEnsembleStorageConfiguration,
  IoTEnsembleTelemetry,
  IoTEnsembleDeviceInfo,
  IoTEnsembleDeviceEnrollment,
  IoTEnsembleTelemetryPayload,
} from './../../state/iot-ensemble.state';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SideNavService } from '../../services/sidenav.service';
import { animateText, onSideNavOpenClose } from '../../animations/animations';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericModalService } from '../../services/generic-modal.service';
import { GenericModalModel } from '../../models/generice-modal.model';

export class LcuLowCodeUnitManageElementState {}

export class LcuLowCodeUnitManageContext extends LCUElementContext<LcuLowCodeUnitManageElementState> {}

export const SELECTOR_LCU_LOWCODEUNIT_MANAGE_ELEMENT = 'lcu-lowcodeunit-manage-element';

@Component({
  selector: SELECTOR_LCU_LOWCODEUNIT_MANAGE_ELEMENT,
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  animations: [onSideNavOpenClose, animateText],
})
export class LcuLowCodeUnitManageElementComponent
  extends LcuElementComponent<LcuLowCodeUnitManageContext>
  implements OnChanges, OnInit {
  //  Fields

  //  Properties

  //  Constructors
  constructor(
    protected injector: Injector,
    protected dialog: MatDialog,
    // protected genericModalService: GenericModalService<PayloadFormComponent>,
    protected formBldr: FormBuilder,
    protected lcuSvcSettings: LCUServiceSettings,
  ) {
    super(injector);
  }

  //  Life Cycle
  public ngOnChanges(changes: SimpleChanges): void {
    this.handleStateChanged(changes);
  }

  public ngOnInit() {
    super.ngOnInit();

    // this.setupAddDeviceForm();
  }

  //  API Methods

  //  Helpers
  protected handleStateChanged(changes: SimpleChanges) {
  }

  // protected setupAddDeviceForm() {
  //   this.AddDeviceFormGroup = this.formBldr.group({
  //     deviceName: ['', Validators.required],
  //   });
  // }
}
