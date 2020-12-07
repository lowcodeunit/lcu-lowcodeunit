import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';

@Component({
  selector: 'lcu-refresh-select',
  templateUrl: './refresh-select.component.html',
  styleUrls: ['./refresh-select.component.scss']
})
export class RefreshSelectComponent implements OnInit, OnChanges {
//  Fields

//  Properties

  /**
   * Incoming State
   */
  @Input('state') 
  public State: IoTEnsembleState;

/**
 * outputs the number value of refresh rate selected
 */
  @Output('refresh-rate-changed') 
  public RefreshRateChanged: EventEmitter<number>;

  

  /**
   * Array of numbers in seconds for user to choose from
   */
  public RefreshRateList: Array<number>;

  /**
   * The current refresh rate
   */
  public SelectedRefreshRate: number;

  //  Constructors

  constructor() {

    this.RefreshRateChanged = new EventEmitter();

    this.RefreshRateList = [10, 20, 30, 60];
   }
   
  //  Life Cycle

  ngOnInit(): void {  }

  ngOnChanges(): void {
    this.SelectedRefreshRate = this.State.Telemetry.RefreshRate;
  }

  //  API Methods

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

  //  Helpers

}
