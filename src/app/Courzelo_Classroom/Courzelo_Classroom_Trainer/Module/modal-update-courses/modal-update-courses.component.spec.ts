import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateCoursesComponent } from './modal-update-courses.component';

describe('ModalUpdateCoursesComponent', () => {
  let component: ModalUpdateCoursesComponent;
  let fixture: ComponentFixture<ModalUpdateCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
