import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomTraineehomeComponent } from './classroomTraineehome.component';

describe('ClassroomhomeComponent', () => {
  let component: ClassroomTraineehomeComponent;
  let fixture: ComponentFixture<ClassroomTraineehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomTraineehomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomTraineehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
