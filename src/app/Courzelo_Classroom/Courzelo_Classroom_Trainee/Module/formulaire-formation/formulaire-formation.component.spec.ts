import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireFormationComponent } from './formulaire-formation.component';

describe('FormulaireFormationComponent', () => {
  let component: FormulaireFormationComponent;
  let fixture: ComponentFixture<FormulaireFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
