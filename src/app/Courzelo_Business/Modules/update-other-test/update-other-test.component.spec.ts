import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOtherTestComponent } from './update-other-test.component';

describe('UpdateOtherTestComponent', () => {
  let component: UpdateOtherTestComponent;
  let fixture: ComponentFixture<UpdateOtherTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOtherTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOtherTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
