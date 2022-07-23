import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPerCategoryComponent } from './courses-per-category.component';

describe('CoursesPerCategoryComponent', () => {
  let component: CoursesPerCategoryComponent;
  let fixture: ComponentFixture<CoursesPerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPerCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
