import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxTrainerComponent } from './flux-trainer.component';

describe('FluxTrainerComponent', () => {
  let component: FluxTrainerComponent;
  let fixture: ComponentFixture<FluxTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluxTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
