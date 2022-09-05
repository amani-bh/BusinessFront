import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCoursesComponent } from './business-courses.component';

describe('BusinessCoursesComponent', () => {
  let component: BusinessCoursesComponent;
  let fixture: ComponentFixture<BusinessCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
