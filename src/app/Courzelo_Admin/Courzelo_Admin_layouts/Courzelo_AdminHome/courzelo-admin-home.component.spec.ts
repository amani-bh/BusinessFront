import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourzeloAdminHomeComponent } from './courzelo-admin-home.component';

describe('CourzeloAdminHomeComponent', () => {
  let component: CourzeloAdminHomeComponent;
  let fixture: ComponentFixture<CourzeloAdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourzeloAdminHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourzeloAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
