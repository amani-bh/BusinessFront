import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourzeloStackHomeComponent } from './courzelo-stack-home.component';

describe('CourzeloStackHomeComponent', () => {
  let component: CourzeloStackHomeComponent;
  let fixture: ComponentFixture<CourzeloStackHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourzeloStackHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourzeloStackHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
