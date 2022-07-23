import { TestBed } from '@angular/core/testing';

import { MylearningService } from './mylearning.service';

describe('MylearningService', () => {
  let service: MylearningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MylearningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
