import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsignedHomeComponent } from './unsigned-home.component';

describe('UnsignedHomeComponent', () => {
  let component: UnsignedHomeComponent;
  let fixture: ComponentFixture<UnsignedHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsignedHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsignedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
