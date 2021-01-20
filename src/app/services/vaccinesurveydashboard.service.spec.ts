import { TestBed } from '@angular/core/testing';

import { VaccinesurveydashboardService } from './vaccinesurveydashboard.service';

describe('VaccinesurveydashboardService', () => {
  let service: VaccinesurveydashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinesurveydashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
