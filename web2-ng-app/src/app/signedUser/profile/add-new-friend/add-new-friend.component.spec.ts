import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFriendComponent } from './add-new-friend.component';

describe('AddNewFriendComponent', () => {
  let component: AddNewFriendComponent;
  let fixture: ComponentFixture<AddNewFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
