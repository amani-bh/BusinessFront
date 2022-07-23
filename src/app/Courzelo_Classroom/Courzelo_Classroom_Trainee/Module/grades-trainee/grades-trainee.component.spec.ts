import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesTraineeComponent } from './grades-trainee.component';

describe('GradesTraineeComponent', () => {
  let component: GradesTraineeComponent;
  let fixture: ComponentFixture<GradesTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesTraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
