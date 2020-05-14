import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacServiceOfficesComponent } from './rac-service-offices.component';

describe('RacServiceOfficesComponent', () => {
  let component: RacServiceOfficesComponent;
  let fixture: ComponentFixture<RacServiceOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacServiceOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacServiceOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
