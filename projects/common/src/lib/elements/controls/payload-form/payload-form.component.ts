import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IoTEnsembleTelemetryPayload } from './../../../state/iot-ensemble.state';

@Component({
  selector: 'lcu-payload-form',
  templateUrl: './payload-form.component.html',
  styleUrls: ['./payload-form.component.scss'],
})
export class PayloadFormComponent implements OnInit {
  //  Fields

  //  Properties
  @Output('canceled')
  public Canceled: EventEmitter<any>;

  public PayloadFormGroup: FormGroup;

  @Output('sent')
  public Sent: EventEmitter<IoTEnsembleTelemetryPayload>;

  //  Constructors
  constructor(protected formBldr: FormBuilder) {
    this.Canceled = new EventEmitter();

    this.Sent = new EventEmitter();
  }

  //  Life Cycle
  public ngOnInit() {
    this.setupPayloadForm();
  }

  //  API Methods
  public Cancel() {
    this.Canceled.emit();
  }

  public Send() {
    const payload = this.buildPayload();

    this.Sent.emit(payload);
  }

  //  Helpers
  protected buildPayload() {
    return {} as IoTEnsembleTelemetryPayload;
  }

  protected setupPayloadForm() {
    this.PayloadFormGroup = this.formBldr.group({
      deviceName: ['', Validators.required],
    });
  }
}
