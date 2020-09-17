import { TestBed } from '@angular/core/testing';

import { MapportalService } from './mapportal.service';

describe('MapportalService', () => {
  let service: MapportalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapportalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
