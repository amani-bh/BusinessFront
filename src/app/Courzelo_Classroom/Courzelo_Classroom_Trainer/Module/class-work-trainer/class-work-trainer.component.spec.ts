import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassWorkTrainerComponent } from './class-work-trainer.component';

describe('ClassWorkTrainerComponent', () => {
  let component: ClassWorkTrainerComponent;
  let fixture: ComponentFixture<ClassWorkTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassWorkTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassWorkTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
