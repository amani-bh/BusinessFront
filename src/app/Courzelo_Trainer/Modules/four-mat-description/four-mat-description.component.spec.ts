import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourMatDescriptionComponent } from './four-mat-description.component';

describe('FourMatDescriptionComponent', () => {
  let component: FourMatDescriptionComponent;
  let fixture: ComponentFixture<FourMatDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourMatDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourMatDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
