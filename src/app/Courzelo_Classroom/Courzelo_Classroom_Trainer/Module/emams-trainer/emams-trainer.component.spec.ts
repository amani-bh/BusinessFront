import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmamsTrainerComponent } from './emams-trainer.component';

describe('EmamsTrainerComponent', () => {
  let component: EmamsTrainerComponent;
  let fixture: ComponentFixture<EmamsTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmamsTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmamsTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
