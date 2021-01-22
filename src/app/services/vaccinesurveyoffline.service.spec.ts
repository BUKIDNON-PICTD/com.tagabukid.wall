import { TestBed } from '@angular/core/testing';

import { VaccinesurveyofflineService } from './vaccinesurveyoffline.service';

describe('VaccinesurveyofflineService', () => {
  let service: VaccinesurveyofflineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinesurveyofflineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
