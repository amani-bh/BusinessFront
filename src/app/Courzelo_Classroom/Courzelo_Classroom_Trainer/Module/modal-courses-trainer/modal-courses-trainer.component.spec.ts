import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoursesTrainerComponent } from './modal-courses-trainer.component';

describe('ModalCoursesTrainerComponent', () => {
  let component: ModalCoursesTrainerComponent;
  let fixture: ComponentFixture<ModalCoursesTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCoursesTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCoursesTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
