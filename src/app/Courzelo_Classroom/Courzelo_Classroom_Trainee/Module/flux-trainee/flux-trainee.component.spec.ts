import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxTraineeComponent } from './flux-trainee.component';

describe('FluxTraineeComponent', () => {
  let component: FluxTraineeComponent;
  let fixture: ComponentFixture<FluxTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluxTraineeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
