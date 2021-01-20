import { TestBed } from '@angular/core/testing';

import { VaccinesurveyService } from './vaccinesurvey.service';

describe('VaccinesurveyService', () => {
  let service: VaccinesurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinesurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
