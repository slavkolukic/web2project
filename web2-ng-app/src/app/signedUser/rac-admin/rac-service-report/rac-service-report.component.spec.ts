import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacServiceReportComponent } from './rac-service-report.component';

describe('RacServiceReportComponent', () => {
  let component: RacServiceReportComponent;
  let fixture: ComponentFixture<RacServiceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacServiceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacServiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
