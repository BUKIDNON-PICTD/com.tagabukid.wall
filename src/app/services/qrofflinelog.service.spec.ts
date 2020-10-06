import { TestBed } from '@angular/core/testing';

import { QrofflinelogService } from './qrofflinelog.service';

describe('QrofflinelogService', () => {
  let service: QrofflinelogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrofflinelogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
