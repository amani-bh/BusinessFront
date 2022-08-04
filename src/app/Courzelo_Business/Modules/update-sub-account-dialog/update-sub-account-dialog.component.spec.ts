import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubAccountDialogComponent } from './update-sub-account-dialog.component';

describe('UpdateSubAccountDialogComponent', () => {
  let component: UpdateSubAccountDialogComponent;
  let fixture: ComponentFixture<UpdateSubAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubAccountDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
