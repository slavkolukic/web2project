import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacServiceCarsComponent } from './rac-service-cars.component';

describe('RacServiceCarsComponent', () => {
  let component: RacServiceCarsComponent;
  let fixture: ComponentFixture<RacServiceCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacServiceCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacServiceCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
