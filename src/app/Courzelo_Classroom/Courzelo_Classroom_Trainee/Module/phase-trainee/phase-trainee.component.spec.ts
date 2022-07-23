import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseTraineeComponent } from './phase-trainee.component';

describe('PhaseTraineeComponent', () => {
  let component: PhaseTraineeComponent;
  let fixture: ComponentFixture<PhaseTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseTraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
