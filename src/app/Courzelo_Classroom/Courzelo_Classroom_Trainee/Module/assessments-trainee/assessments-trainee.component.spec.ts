import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsTraineeComponent } from './assessments-trainee.component';

describe('AssessmentsTraineeComponent', () => {
  let component: AssessmentsTraineeComponent;
  let fixture: ComponentFixture<AssessmentsTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentsTraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
