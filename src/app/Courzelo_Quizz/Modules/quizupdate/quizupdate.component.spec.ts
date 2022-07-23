import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizupdateComponent } from './quizupdate.component';

describe('QuizupdateComponent', () => {
  let component: QuizupdateComponent;
  let fixture: ComponentFixture<QuizupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
