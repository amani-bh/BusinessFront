import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMacroSoftSkillsComponent } from './show-macro-soft-skills.component';

describe('ShowMacroSoftSkillsComponent', () => {
  let component: ShowMacroSoftSkillsComponent;
  let fixture: ComponentFixture<ShowMacroSoftSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMacroSoftSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMacroSoftSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
