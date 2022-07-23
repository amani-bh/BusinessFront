import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTrainerComponent } from './courses-trainer.component';

describe('CoursesTrainerComponent', () => {
  let component: CoursesTrainerComponent;
  let fixture: ComponentFixture<CoursesTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
