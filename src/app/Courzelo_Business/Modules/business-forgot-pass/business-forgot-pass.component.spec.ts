import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessForgotPassComponent } from './business-forgot-pass.component';

describe('BusinessForgotPassComponent', () => {
  let component: BusinessForgotPassComponent;
  let fixture: ComponentFixture<BusinessForgotPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessForgotPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessForgotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
