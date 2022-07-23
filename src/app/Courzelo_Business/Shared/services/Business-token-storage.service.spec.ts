import { TestBed } from '@angular/core/testing';

import { BusinessTokenStorageService } from './Business-token-storage.service';

describe('BusinessTokenStorageService', () => {
  let service: BusinessTokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessTokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
