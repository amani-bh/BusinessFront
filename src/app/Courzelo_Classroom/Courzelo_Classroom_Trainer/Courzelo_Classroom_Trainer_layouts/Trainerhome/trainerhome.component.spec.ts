import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerhomeComponent } from './trainerhome.component';

describe('TrainerhomeComponent', () => {
  let component: TrainerhomeComponent;
  let fixture: ComponentFixture<TrainerhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
