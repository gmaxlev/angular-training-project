import { TestBed } from '@angular/core/testing';

import { VacationsApiService } from './Vacations-api.service';

describe('VacationsApiService', () => {
  let service: VacationsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
