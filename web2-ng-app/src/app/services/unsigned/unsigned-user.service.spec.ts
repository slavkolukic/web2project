import { TestBed } from '@angular/core/testing';

import { UnsignedUserService } from './unsigned-user.service';

describe('UnsignedUserService', () => {
  let service: UnsignedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsignedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
