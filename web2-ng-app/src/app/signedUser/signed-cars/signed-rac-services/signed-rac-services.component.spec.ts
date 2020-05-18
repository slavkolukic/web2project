import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedRacServicesComponent } from './signed-rac-services.component';

describe('SignedRacServicesComponent', () => {
  let component: SignedRacServicesComponent;
  let fixture: ComponentFixture<SignedRacServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedRacServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedRacServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
