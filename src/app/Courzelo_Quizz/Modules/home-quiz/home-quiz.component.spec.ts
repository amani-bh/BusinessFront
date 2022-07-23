import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeQuizComponent } from './home-quiz.component';

describe('HomeQuizComponent', () => {
  let component: HomeQuizComponent;
  let fixture: ComponentFixture<HomeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
