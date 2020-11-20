import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryListComponent } from './telemetry-list.component';

describe('TelemetryListComponent', () => {
  let component: TelemetryListComponent;
  let fixture: ComponentFixture<TelemetryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemetryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemetryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
