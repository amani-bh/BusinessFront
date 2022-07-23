import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPertraineeComponent } from './quiz-pertrainee.component';

describe('QuizPertraineeComponent', () => {
  let component: QuizPertraineeComponent;
  let fixture: ComponentFixture<QuizPertraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizPertraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPertraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
