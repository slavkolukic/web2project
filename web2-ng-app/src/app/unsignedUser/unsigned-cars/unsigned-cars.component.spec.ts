import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsignedCarsComponent } from './unsigned-cars.component';

describe('UnsignedCarsComponent', () => {
  let component: UnsignedCarsComponent;
  let fixture: ComponentFixture<UnsignedCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsignedCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsignedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
