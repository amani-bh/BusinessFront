import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCourseTypeComponent } from './choose-course-type.component';

describe('ChooseCourseTypeComponent', () => {
  let component: ChooseCourseTypeComponent;
  let fixture: ComponentFixture<ChooseCourseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCourseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCourseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
