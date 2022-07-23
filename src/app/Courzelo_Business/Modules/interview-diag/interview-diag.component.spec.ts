import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewDiagComponent } from './interview-diag.component';

describe('InterviewDiagComponent', () => {
  let component: InterviewDiagComponent;
  let fixture: ComponentFixture<InterviewDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
