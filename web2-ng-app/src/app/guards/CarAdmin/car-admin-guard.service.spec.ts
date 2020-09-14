import { TestBed } from '@angular/core/testing';

import { CarAdminGuardService } from './car-admin-guard.service';

describe('CarAdminGuardService', () => {
  let service: CarAdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarAdminGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
