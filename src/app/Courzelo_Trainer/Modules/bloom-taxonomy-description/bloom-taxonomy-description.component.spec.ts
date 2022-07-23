import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloomTaxonomyDescriptionComponent } from './bloom-taxonomy-description.component';

describe('BloomTaxonomyDescriptionComponent', () => {
  let component: BloomTaxonomyDescriptionComponent;
  let fixture: ComponentFixture<BloomTaxonomyDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloomTaxonomyDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloomTaxonomyDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
