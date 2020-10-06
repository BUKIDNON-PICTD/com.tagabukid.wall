import { TestBed } from '@angular/core/testing';

import { QrlogService } from './qrlog.service';

describe('QrlogService', () => {
  let service: QrlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
