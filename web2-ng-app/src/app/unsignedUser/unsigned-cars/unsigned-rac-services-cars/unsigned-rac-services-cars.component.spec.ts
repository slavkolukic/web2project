import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsignedRacServicesCarsComponent } from './unsigned-rac-services-cars.component';

describe('UnsignedRacServicesCarsComponent', () => {
  let component: UnsignedRacServicesCarsComponent;
  let fixture: ComponentFixture<UnsignedRacServicesCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsignedRacServicesCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsignedRacServicesCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
