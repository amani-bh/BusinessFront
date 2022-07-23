import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCourseComponent } from './custom-course.component';

describe('CustomCourseComponent', () => {
  let component: CustomCourseComponent;
  let fixture: ComponentFixture<CustomCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
