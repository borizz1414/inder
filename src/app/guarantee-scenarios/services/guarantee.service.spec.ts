import { TestBed } from '@angular/core/testing';

import { GuaranteeService } from './guarantee.service';

describe('GuaranteeService', () => {
  let service: GuaranteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuaranteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
