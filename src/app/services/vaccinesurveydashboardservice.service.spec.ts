import { TestBed } from '@angular/core/testing';

import { VaccinesurveydashboardserviceService } from './vaccinesurveydashboardservice.service';

describe('VaccinesurveydashboardserviceService', () => {
  let service: VaccinesurveydashboardserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinesurveydashboardserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
