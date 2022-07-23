import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessResetPassComponent } from './business-reset-pass.component';

describe('BusinessResetPassComponent', () => {
  let component: BusinessResetPassComponent;
  let fixture: ComponentFixture<BusinessResetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessResetPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessResetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
