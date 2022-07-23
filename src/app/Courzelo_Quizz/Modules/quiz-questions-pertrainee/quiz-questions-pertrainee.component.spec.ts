import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionsPertraineeComponent } from './quiz-questions-pertrainee.component';

describe('QuizQuestionsPertraineeComponent', () => {
  let component: QuizQuestionsPertraineeComponent;
  let fixture: ComponentFixture<QuizQuestionsPertraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizQuestionsPertraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionsPertraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
