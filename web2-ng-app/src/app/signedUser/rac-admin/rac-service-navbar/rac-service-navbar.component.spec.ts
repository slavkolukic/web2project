import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacServiceNavbarComponent } from './rac-service-navbar.component';

describe('RacServiceNavbarComponent', () => {
  let component: RacServiceNavbarComponent;
  let fixture: ComponentFixture<RacServiceNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacServiceNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacServiceNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
