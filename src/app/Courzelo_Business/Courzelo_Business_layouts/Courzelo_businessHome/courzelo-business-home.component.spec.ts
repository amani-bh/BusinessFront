import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourzeloBusinessHomeComponent } from './courzelo-business-home.component';

describe('CourzeloBusinessHomeComponent', () => {
  let component: CourzeloBusinessHomeComponent;
  let fixture: ComponentFixture<CourzeloBusinessHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourzeloBusinessHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourzeloBusinessHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
