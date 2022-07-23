import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackBoardComponent } from './track-board.component';

describe('TrackBoardComponent', () => {
  let component: TrackBoardComponent;
  let fixture: ComponentFixture<TrackBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
