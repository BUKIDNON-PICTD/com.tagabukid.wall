import { TestBed } from '@angular/core/testing';

import { OfflinemanagerService } from './offlinemanager.service';

describe('OfflinemanagerService', () => {
  let service: OfflinemanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflinemanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
