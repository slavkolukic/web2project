import { TestBed } from '@angular/core/testing';

import { RacAdminService } from './rac-admin.service';

describe('RacAdminService', () => {
  let service: RacAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
