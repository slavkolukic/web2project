import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedHomeComponent } from './signed-home.component';

describe('SignedHomeComponent', () => {
  let component: SignedHomeComponent;
  let fixture: ComponentFixture<SignedHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
