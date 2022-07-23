import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilclassesComponent } from './accueilclasses.component';

describe('AccueilclassesComponent', () => {
  let component: AccueilclassesComponent;
  let fixture: ComponentFixture<AccueilclassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilclassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
