import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsignedRacServicesComponent } from './unsigned-rac-services.component';

describe('UnsignedRacServicesComponent', () => {
  let component: UnsignedRacServicesComponent;
  let fixture: ComponentFixture<UnsignedRacServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsignedRacServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsignedRacServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
