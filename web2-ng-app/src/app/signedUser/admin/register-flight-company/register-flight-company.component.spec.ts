import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFlightCompanyComponent } from './register-flight-company.component';

describe('RegisterFlightCompanyComponent', () => {
  let component: RegisterFlightCompanyComponent;
  let fixture: ComponentFixture<RegisterFlightCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFlightCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFlightCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
