import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMicroHardSkillsComponent } from './show-micro-hard-skills.component';

describe('ShowMicroHardSkillsComponent', () => {
  let component: ShowMicroHardSkillsComponent;
  let fixture: ComponentFixture<ShowMicroHardSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMicroHardSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMicroHardSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
