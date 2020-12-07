import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshSelectComponent } from './refresh-select.component';

describe('RefreshSelectComponent', () => {
  let component: RefreshSelectComponent;
  let fixture: ComponentFixture<RefreshSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
