import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedFlightsComponent } from './signed-flights.component';

describe('SignedFlightsComponent', () => {
  let component: SignedFlightsComponent;
  let fixture: ComponentFixture<SignedFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
