import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCourseDetailComponent } from './single-course-detail.component';

describe('SingleCourseDetailComponent', () => {
  let component: SingleCourseDetailComponent;
  let fixture: ComponentFixture<SingleCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCourseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
