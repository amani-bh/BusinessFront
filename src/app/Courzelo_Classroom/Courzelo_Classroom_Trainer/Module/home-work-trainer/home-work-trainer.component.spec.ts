import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWorkTrainerComponent } from './home-work-trainer.component';

describe('HomeWorkTrainerComponent', () => {
  let component: HomeWorkTrainerComponent;
  let fixture: ComponentFixture<HomeWorkTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeWorkTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWorkTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
