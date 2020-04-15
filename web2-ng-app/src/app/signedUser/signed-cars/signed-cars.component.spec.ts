import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedCarsComponent } from './signed-cars.component';

describe('SignedCarsComponent', () => {
  let component: SignedCarsComponent;
  let fixture: ComponentFixture<SignedCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
