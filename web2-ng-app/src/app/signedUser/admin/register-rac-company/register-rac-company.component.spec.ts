import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRacCompanyComponent } from './register-rac-company.component';

describe('RegisterRacCompanyComponent', () => {
  let component: RegisterRacCompanyComponent;
  let fixture: ComponentFixture<RegisterRacCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRacCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRacCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
