import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySubAccountComponent } from './verify-sub-account.component';

describe('VerifySubAccountComponent', () => {
  let component: VerifySubAccountComponent;
  let fixture: ComponentFixture<VerifySubAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifySubAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifySubAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
