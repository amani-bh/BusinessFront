import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareBusinessCourseDialogComponent } from './share-business-course-dialog.component';

describe('ShareBusinessCourseDialogComponent', () => {
  let component: ShareBusinessCourseDialogComponent;
  let fixture: ComponentFixture<ShareBusinessCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareBusinessCourseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareBusinessCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
