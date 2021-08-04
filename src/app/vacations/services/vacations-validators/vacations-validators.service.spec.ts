import { TestBed } from '@angular/core/testing';

import { VacationsValidatorsService } from './vacations-validators.service';

describe('VacationsValidatorsService', () => {
  let service: VacationsValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationsValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
