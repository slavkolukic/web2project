import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsignedFlightsComponent } from './unsigned-flights.component';

describe('UnsignedFlightsComponent', () => {
  let component: UnsignedFlightsComponent;
  let fixture: ComponentFixture<UnsignedFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsignedFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsignedFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
