import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedCoursesTrainerComponent } from './archived-courses-trainer.component';

describe('ArchivedCoursesTrainerComponent', () => {
  let component: ArchivedCoursesTrainerComponent;
  let fixture: ComponentFixture<ArchivedCoursesTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedCoursesTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedCoursesTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
