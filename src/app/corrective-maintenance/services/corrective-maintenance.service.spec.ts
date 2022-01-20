import { TestBed } from '@angular/core/testing';

import { CorrectiveMaintenanceService } from './corrective-maintenance.service';

describe('CorrectiveMaintenanceService', () => {
  let service: CorrectiveMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrectiveMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
