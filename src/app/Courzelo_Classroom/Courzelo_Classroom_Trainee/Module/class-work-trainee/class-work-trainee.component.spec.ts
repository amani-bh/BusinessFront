import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassWorkTraineeComponent } from './class-work-trainee.component';

describe('ClassWorkTraineeComponent', () => {
  let component: ClassWorkTraineeComponent;
  let fixture: ComponentFixture<ClassWorkTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassWorkTraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassWorkTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
