import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourzeloQuizzSkillsHomeComponent } from './courzelo-quizz-skills-home.component';

describe('CourzeloQuizzSkillsHomeComponent', () => {
  let component: CourzeloQuizzSkillsHomeComponent;
  let fixture: ComponentFixture<CourzeloQuizzSkillsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourzeloQuizzSkillsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourzeloQuizzSkillsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
