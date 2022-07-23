import { TestBed } from '@angular/core/testing';

import { BusinessAuthService } from './Business-auth.service';

describe('BusinessAuthService', () => {
  let service: BusinessAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
