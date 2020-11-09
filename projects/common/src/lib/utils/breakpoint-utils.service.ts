import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable, Injector } from '@angular/core';
import { StateContext } from '@lcu/common';

@Injectable({
  providedIn: 'root',
})
export class BreakpointUtils {
  // Constructors
  constructor(protected breakpointObserver: BreakpointObserver) {}

  // API Methods
  public SetupIsMobileObserver(next?: (value: BreakpointState) => void) {
    return this.breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.HandsetPortrait,
        Breakpoints.Small,
        Breakpoints.XSmall,
      ])
      .subscribe(next);
  }

  //  Helpers
}
