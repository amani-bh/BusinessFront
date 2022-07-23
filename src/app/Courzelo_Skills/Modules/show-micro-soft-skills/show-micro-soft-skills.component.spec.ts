import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMicroSoftSkillsComponent } from './show-micro-soft-skills.component';

describe('ShowMicroSoftSkillsComponent', () => {
  let component: ShowMicroSoftSkillsComponent;
  let fixture: ComponentFixture<ShowMicroSoftSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMicroSoftSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMicroSoftSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
