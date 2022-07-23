import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyDiagComponent } from './apply-diag.component';

describe('ApplyDiagComponent', () => {
  let component: ApplyDiagComponent;
  let fixture: ComponentFixture<ApplyDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
