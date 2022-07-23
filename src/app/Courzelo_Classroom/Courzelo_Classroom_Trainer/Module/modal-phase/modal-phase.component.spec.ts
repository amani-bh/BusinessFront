import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPhaseComponent } from './modal-phase.component';

describe('ModalPhaseComponent', () => {
  let component: ModalPhaseComponent;
  let fixture: ComponentFixture<ModalPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPhaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
