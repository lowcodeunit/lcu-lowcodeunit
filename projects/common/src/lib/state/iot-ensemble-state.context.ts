import { Injectable, Injector } from '@angular/core';
import { StateContext } from '@lcu/common';
import { IoTEnsembleState } from './iot-ensemble.state';

@Injectable({
  providedIn: 'root',
})
export class IoTEnsembleStateContext extends StateContext<IoTEnsembleState> {
  // Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  // API Methods
  public ToggleEmulatedEnabled(): void {
      this.Execute({
          Arguments: {},
          Type: 'ToggleEmulatedEnabled'
      });
  }

  //  Helpers
  protected defaultValue() {
    return { Loading: true } as IoTEnsembleState;
  }

  protected loadStateKey(): string {
    return 'main';
  }

  protected loadStateName(): string {
    return 'iotensemble';
  }
}
