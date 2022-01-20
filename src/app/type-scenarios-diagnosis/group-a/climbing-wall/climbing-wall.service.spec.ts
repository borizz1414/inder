import { TestBed } from '@angular/core/testing';

import { ClimbingWallService } from './climbing-wall.service';

describe('ClimbingWallService', () => {
  let service: ClimbingWallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClimbingWallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
