import { TestBed } from '@angular/core/testing';

import { CatchLocationService } from './catch-location.service';

describe('CatchLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatchLocationService = TestBed.get(CatchLocationService);
    expect(service).toBeTruthy();
  });
});
