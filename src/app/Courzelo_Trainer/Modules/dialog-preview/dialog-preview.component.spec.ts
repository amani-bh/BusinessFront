import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPreviewComponent } from './dialog-preview.component';

describe('DialogPreviewComponent', () => {
  let component: DialogPreviewComponent;
  let fixture: ComponentFixture<DialogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
