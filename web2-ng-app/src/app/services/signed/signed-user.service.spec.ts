import { TestBed } from '@angular/core/testing';

import { SignedUserService } from './signed-user.service';

describe('SignedUserService', () => {
  let service: SignedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
