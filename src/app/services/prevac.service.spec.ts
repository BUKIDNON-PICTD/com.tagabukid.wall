import { TestBed } from '@angular/core/testing';

import { PrevacService } from './prevac.service';

describe('PrevacService', () => {
  let service: PrevacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
