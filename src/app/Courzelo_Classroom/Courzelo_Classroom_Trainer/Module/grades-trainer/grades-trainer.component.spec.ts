import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesTrainerComponent } from './grades-trainer.component';

describe('GradesTrainerComponent', () => {
  let component: GradesTrainerComponent;
  let fixture: ComponentFixture<GradesTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
