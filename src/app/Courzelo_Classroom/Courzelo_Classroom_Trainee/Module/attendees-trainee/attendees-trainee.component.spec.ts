import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeesTraineeComponent } from './attendees-trainee.component';

describe('AttendeesTraineeComponent', () => {
  let component: AttendeesTraineeComponent;
  let fixture: ComponentFixture<AttendeesTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeesTraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeesTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
