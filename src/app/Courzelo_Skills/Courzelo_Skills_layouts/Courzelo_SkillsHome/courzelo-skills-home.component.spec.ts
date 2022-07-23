import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourzeloSkillsHomeComponent } from './courzelo-skills-home.component';

describe('CourzeloSkillsHomeComponent', () => {
  let component: CourzeloSkillsHomeComponent;
  let fixture: ComponentFixture<CourzeloSkillsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourzeloSkillsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourzeloSkillsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
