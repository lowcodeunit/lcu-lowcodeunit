import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  IoTEnsembleState,
  IoTEnsembleStateContext,
} from '@iot-ensemble/lcu-setup-common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //  Fields

  //  Properties
  public IsMobile: boolean;

  @ViewChild('navDrawer')
  public NavDrawer: MatDrawer;

  public get NavDrawerMode(): string {
    return this.IsMobile ? 'over' : 'side';
  }

  public State: IoTEnsembleState;

  //  Constructors
  constructor(
    protected iotEnsCtxt: IoTEnsembleStateContext,
    protected breakpointObserver: BreakpointObserver
  ) {}

  //  Life Cycle
  public ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.HandsetPortrait,
        Breakpoints.Small,
        Breakpoints.XSmall,
      ])
      .subscribe((result) => {
        this.IsMobile = result.matches;

        if (!this.IsMobile && this.NavDrawer) {
          this.NavDrawer.open();
        }
      });
  }

  //  API Methods
  public HeaderMenuClicked(event: MouseEvent) {
    this.NavDrawer.toggle();
  }

  //  Helpers
}
