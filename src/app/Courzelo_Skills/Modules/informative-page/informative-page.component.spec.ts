import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativePageComponent } from './informative-page.component';

describe('InformativePageComponent', () => {
  let component: InformativePageComponent;
  let fixture: ComponentFixture<InformativePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
