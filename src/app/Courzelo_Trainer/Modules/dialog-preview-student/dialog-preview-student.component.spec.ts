import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPreviewStudentComponent } from './dialog-preview-student.component';

describe('DialogPreviewStudentComponent', () => {
  let component: DialogPreviewStudentComponent;
  let fixture: ComponentFixture<DialogPreviewStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPreviewStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPreviewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
