import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnabledToggleComponent } from './enabled-toggle.component';

describe('EnabledToggleComponent', () => {
  let component: EnabledToggleComponent;
  let fixture: ComponentFixture<EnabledToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnabledToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnabledToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
