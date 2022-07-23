import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTrainerComponent } from './header-trainer.component';

describe('HeaderTrainerComponent', () => {
  let component: HeaderTrainerComponent;
  let fixture: ComponentFixture<HeaderTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
