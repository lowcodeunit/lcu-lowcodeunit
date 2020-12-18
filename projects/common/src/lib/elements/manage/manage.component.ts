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
  IoTEnsembleState,
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
import { GenericModalService } from '../../services/generic-modal.service';
import { GenericModalModel } from '../../models/generice-modal.model';
import { PayloadFormComponent } from '../controls/payload-form/payload-form.component';

declare var freeboard: any;

declare var window: any;

export class LcuSetupManageElementState {}

export class LcuSetupManageContext extends LCUElementContext<LcuSetupManageElementState> {}

export const SELECTOR_LCU_SETUP_MANAGE_ELEMENT = 'lcu-setup-manage-element';

@Component({
  selector: SELECTOR_LCU_SETUP_MANAGE_ELEMENT,
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  animations: [onSideNavOpenClose, animateText]
})

export class LcuSetupManageElementComponent
  extends LcuElementComponent<LcuSetupManageContext>
  implements OnChanges, OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  //  Fields

  //  Properties
  public AddDeviceFormGroup: FormGroup;

  public AddingDevice: boolean;

  protected componentRef: ComponentRef<any>;

  public ConnectedDevicesDisplayedColumns: string[];

  public DashboardIFrameURL: SafeResourceUrl;

  public DeviceNames: string[];

  @Output('enroll-device')
  public EnrollDevice: EventEmitter<IoTEnsembleDeviceEnrollment>;

  public FreeboardURL: string;

  @Output('issued-device-sas-token')
  public IssuedDeviceSASToken: EventEmitter<string>;

  public LastSyncedAt: Date;

  /**
   * Access the component passed into the modal
   */
  @ViewChild('ModalContainer', { read: ViewContainerRef })
  public ModalContainerBrah: ViewContainerRef;

  public PipeDate: DataPipeConstants;
  public onSideNavOpenClose: boolean;

  public SideNavOpenCloseEvent: boolean;

  @Output('revoke-device-enrollment')
  public RevokeDeviceEnrollment: EventEmitter<string>;

  @Output('sent-device-message')
  public SentDeviceMessage: EventEmitter<IoTEnsembleTelemetryPayload>;

  @Input('state')
  public State: IoTEnsembleState;

  @Output('toggle-device-telemetry-enabled')
  public ToggleTelemetryEnabled: EventEmitter<boolean>;

  @Output('toggle-emulated-enabled')
  public ToggleEmulatedEnabled: EventEmitter<boolean>;

  @Output('update-device-table-page-size')
  public UpdateDeviceTablePageSize: EventEmitter<any>;

  @Output('update-page-size')
  public UpdatePageSize: EventEmitter<any>;

  @Output('update-refresh-rate')
  public UpdateRefreshRate: EventEmitter<number>;

  protected sideSlideSubscription: Subscription;

  //  Constructors
  constructor(
    protected dialog: MatDialog,
    protected genericModalService: GenericModalService<PayloadFormComponent>,
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    protected formBldr: FormBuilder,
    protected lcuSvcSettings: LCUServiceSettings,
    public SideNavSrvc: SideNavService,
    protected resolver: ComponentFactoryResolver,
  ) {
    super(injector);

    this.ConnectedDevicesDisplayedColumns = [
      'deviceName',
      'enabled',
      'lastUpdate',
      'connStr',
      'actions',
    ];

    this.EnrollDevice = new EventEmitter();

    this.IssuedDeviceSASToken = new EventEmitter();

    this.PipeDate = DataPipeConstants.DATE_TIME_ZONE_FMT;

    this.RevokeDeviceEnrollment = new EventEmitter();

    this.SentDeviceMessage = new EventEmitter();

    this.State = {};

    this.ToggleTelemetryEnabled = new EventEmitter();

    this.ToggleEmulatedEnabled = new EventEmitter();

    this.UpdateDeviceTablePageSize = new EventEmitter();

    this.UpdatePageSize = new EventEmitter();

    this.UpdateRefreshRate = new EventEmitter();

    this.sideSlideSubscription = this.SideNavSrvc.SideNavToggleChanged.subscribe((res: boolean) => {
      this.onSideNavOpenClose = res;
    });
  }

  //  Life Cycle
  public ngAfterContentInit(): void {

    // this.setupFreeboard();
  }

  public ngOnDestroy(): void {

  }

  public ngAfterViewInit(): void {

    // this.setupFreeboard();
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes.State) {
      this.handleStateChanged();
    }
  }

  public ngOnInit() {

    super.ngOnInit();

    this.setupAddDeviceForm();
  }

  //  API Methods
  public DeviceTablePageEvent(event: any) {
    this.UpdateDeviceTablePageSize.emit(event);
  }

  public EnrollDeviceSubmit() {

    this.EnrollDevice.emit({
      DeviceName: this.AddDeviceFormGroup.controls.deviceName.value,
    });
  }

  public HandlePageSizeChange(event: any) {
    this.UpdatePageSize.emit(event);
  }

  public IssueDeviceSASToken(deviceName: string) {
    this.IssuedDeviceSASToken.emit(deviceName);
  }

  public RefreshRateChanged(event: any){

    this.UpdateRefreshRate.emit(event);
  }

  public RevokeDeviceEnrollmentClick(deviceId: string) {

    this.RevokeDeviceEnrollment.emit(deviceId);
  }

  public SendDeviceMesaage(payload: IoTEnsembleTelemetryPayload) {
    this.SentDeviceMessage.emit(payload);
  }

  public ToggleAddingDevice() {

    this.AddingDevice = !this.AddingDevice;
  }

  public ToggleTelemetryEnabledChanged(enabled: boolean) {

    this.ToggleTelemetryEnabled.emit(enabled);
  }

  public ToggleEmulatedEnabledChanged(enabled: boolean) {

    this.ToggleEmulatedEnabled.emit(enabled);
  }

  public ToggleSideNav(): void {

    this.SideNavSrvc.SideNavToggle();
  }

  /**
   *
   * @param evt Animation event for open and closing side nav
   */
  public OnSideNavOpenCloseDoneEvent(evt: AnimationEvent): void {

    this.SideNavOpenCloseEvent = evt['fromState'] === 'open' ? true : false;
  }

  //  Helpers
 
  /**
   * Modal configuration
   */
  public PayloadFormModal(): void {
    debugger;
    let el: ElementRef;
    const payloadForm: PayloadFormComponent = new PayloadFormComponent(el);
    const modalCompFactory: ComponentFactory<PayloadFormComponent> = this.resolver.resolveComponentFactory(
      PayloadFormComponent
    );

    this.componentRef = this.ModalContainerBrah.createComponent<PayloadFormComponent>(
      modalCompFactory
    );
    // ksdfe.ActiveDAFApplicationID = this.State.ActiveDAFAppID;
    // ksdfe.Application = this.ActiveApp;
    // ksdfe.ApplicationPaths = this.ApplicationPaths;
    // ksdfe.CurrentApplicationTab = this.State.CurrentApplicationTab;
    // ksdfe.DAFAppOptions = this.State.DAFAppOptions;
    // ksdfe.DAFApplications = this.State.DAFApplications;
    // payloadForm.Loading = this.State.Loading;

    setTimeout(() => {
      const modalConfig: GenericModalModel = new GenericModalModel({
        ModalType: 'data', // type of modal we want (data, confirm, info)
        CallbackAction: this.confirmCallback, // function exposed to the modal
        Component: payloadForm, // set component to be used inside the modal
        LabelCancel: 'Cancel',
        LabelAction: 'OK',
        Title: 'Settings',
        Width: '100%',
      });

      /**
       * Pass modal config to service open function
       */
      this.genericModalService.Open(modalConfig);

      this.genericModalService.ModalComponent.afterOpened().subscribe(
        (res: any) => {
          this.State.Loading = false;
          console.log('MODAL OPEN', res);
        }
      );

      this.genericModalService.ModalComponent.afterClosed().subscribe(
        (res: any) => {
          console.log('MODAL CLOSED', res);
        }
      );

      this.genericModalService.OnAction().subscribe((res: any) => {
        console.log('ONAction', res);
      });
    }, 1000);
  }
  /**
   *
   * @param val value(s) being returned on confirmation action
   *
   * Callback function passed into the modal configuration
   */
  protected confirmCallback(val: any): void {
    debugger;
  }

  protected convertToDate(syncDate: string) {
    if (syncDate) {
      this.LastSyncedAt = new Date(Date.parse(syncDate));
    }
  }

  protected handleStateChanged() {

    this.setAddingDevice();

    this.setupFreeboard();

    if (this.State.Telemetry) {

      this.convertToDate(this.State.Telemetry.LastSyncedAt);
    }

    this.DeviceNames = this.State.ConnectedDevicesConfig?.Devices?.map((d) => d.DeviceName) || [];
  }

  protected setAddingDevice() {
    this.AddingDevice = (this.State.ConnectedDevicesConfig?.Devices?.length || 0) <= 0;
  }

  protected setDashboardIFrameURL() {

    const source = this.State.Dashboard?.FreeboardConfig
      ? JSON.stringify(this.State.Dashboard?.FreeboardConfig)
      : '';

    this.DashboardIFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.FreeboardURL}#data=${source}`
    );

    this.FreeboardURL = this.lcuSvcSettings.State.FreeboardURL || '/freeboard';
  }

  protected setupAddDeviceForm() {

    this.AddDeviceFormGroup = this.formBldr.group({
      deviceName: ['', Validators.required],
    });
  }

  protected setupFreeboard() {

    this.setDashboardIFrameURL();

    if (this.State.Dashboard && this.State.Dashboard.FreeboardConfig) {
      //   // debugger;
      //   // freeboard.initialize(true);
      //   // const dashboard = freeboard.loadDashboard(
      //   //   this.State.Dashboard.FreeboardConfig,
      //   //   () => {
      //   //     freeboard.setEditing(false);
      //   //   }
      //   // );
      //   // console.log(dashboard);
    }
  }
}
