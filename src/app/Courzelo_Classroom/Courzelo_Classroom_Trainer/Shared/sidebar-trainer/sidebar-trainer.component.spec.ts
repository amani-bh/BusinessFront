import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTrainerComponent } from './sidebar-trainer.component';

describe('SidebarTrainerComponent', () => {
  let component: SidebarTrainerComponent;
  let fixture: ComponentFixture<SidebarTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
