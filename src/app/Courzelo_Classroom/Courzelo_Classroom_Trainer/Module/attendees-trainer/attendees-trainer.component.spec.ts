import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeesTrainerComponent } from './attendees-trainer.component';

describe('AttendeesTrainerComponent', () => {
  let component: AttendeesTrainerComponent;
  let fixture: ComponentFixture<AttendeesTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeesTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeesTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
