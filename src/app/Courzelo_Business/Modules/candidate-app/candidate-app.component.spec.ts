import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAppComponent } from './candidate-app.component';

describe('CandidateAppComponent', () => {
  let component: CandidateAppComponent;
  let fixture: ComponentFixture<CandidateAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
