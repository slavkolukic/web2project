import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedRacServicesCarsComponent } from './signed-rac-services-cars.component';

describe('SignedRacServicesCarsComponent', () => {
  let component: SignedRacServicesCarsComponent;
  let fixture: ComponentFixture<SignedRacServicesCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedRacServicesCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedRacServicesCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
