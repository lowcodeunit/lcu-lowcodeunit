import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lcu-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('loading')
  public Loading: boolean;

  //  Constructors
  constructor() {}

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods

  //  Helpers
}
