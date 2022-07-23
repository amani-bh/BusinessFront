import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDiagComponent } from './offer-diag.component';

describe('OfferDiagComponent', () => {
  let component: OfferDiagComponent;
  let fixture: ComponentFixture<OfferDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
