import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubAccountDialogComponent } from './add-sub-account-dialog.component';

describe('AddSubAccountDialogComponent', () => {
  let component: AddSubAccountDialogComponent;
  let fixture: ComponentFixture<AddSubAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubAccountDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
