import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceFormationComponent } from './espace-formation.component';

describe('EspaceFormationComponent', () => {
  let component: EspaceFormationComponent;
  let fixture: ComponentFixture<EspaceFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
