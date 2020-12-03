import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';

@Component({
  selector: 'lcu-refresh-select',
  templateUrl: './refresh-select.component.html',
  styleUrls: ['./refresh-select.component.scss']
})
export class RefreshSelectComponent implements OnInit, OnChanges {

  /**
   * Incoming State
   */
  @Input('state') State: IoTEnsembleState;
/**
 * outputs the number value of refresh rate selected
 */
  @Output('refresh-rate-changed') RefreshRateChanged: EventEmitter<number>;

  /**
   * Array of numbers in seconds for user to choose from
   */
  public RefreshRateList: Array<number>;

  /**
   * The current refresh rate
   */
  public SelectedRefreshRate: number;

  constructor() {
    this.RefreshRateList = [10, 20, 30, 60];
    this.RefreshRateChanged = new EventEmitter();
   }

  ngOnInit(): void {  }

  ngOnChanges(): void {
    this.SelectedRefreshRate = this.State.Telemetry.RefreshRate;
  }

/**
 * Updates the SelectedRefreshRate with the option selected 
 * 
 * and emitis the new value to update the state
 * 
 * @param event the number of seconds
 */
  public SelectRefreshRate(event: any): void{
    this.SelectedRefreshRate = event.value;
    this.RefreshRateChanged.emit(this.SelectedRefreshRate);
  }  

}
