import { TestBed } from '@angular/core/testing';

import { CourseDataSharedService } from './course-data-shared.service';

describe('CourseDataSharedService', () => {
  let service: CourseDataSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseDataSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
