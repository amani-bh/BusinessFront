import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTestsComponent } from './other-tests.component';

describe('OtherTestsComponent', () => {
  let component: OtherTestsComponent;
  let fixture: ComponentFixture<OtherTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
