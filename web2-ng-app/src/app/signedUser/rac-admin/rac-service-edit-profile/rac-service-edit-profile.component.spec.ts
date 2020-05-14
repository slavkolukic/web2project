import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacServiceEditProfileComponent } from './rac-service-edit-profile.component';

describe('RacServiceEditProfileComponent', () => {
  let component: RacServiceEditProfileComponent;
  let fixture: ComponentFixture<RacServiceEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacServiceEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacServiceEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
