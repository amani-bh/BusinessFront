import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMacroHardSkillsComponent } from './show-macro-hard-skills.component';

describe('ShowMacroHardSkillsComponent', () => {
  let component: ShowMacroHardSkillsComponent;
  let fixture: ComponentFixture<ShowMacroHardSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMacroHardSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMacroHardSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
