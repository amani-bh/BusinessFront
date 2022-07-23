import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCandidateComponent } from './compare-candidate.component';

describe('CompareCandidateComponent', () => {
  let component: CompareCandidateComponent;
  let fixture: ComponentFixture<CompareCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
