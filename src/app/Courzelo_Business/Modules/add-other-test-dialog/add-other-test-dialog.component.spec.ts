import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherTestDialogComponent } from './add-other-test-dialog.component';

describe('AddOtherTestDialogComponent', () => {
  let component: AddOtherTestDialogComponent;
  let fixture: ComponentFixture<AddOtherTestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOtherTestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOtherTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
