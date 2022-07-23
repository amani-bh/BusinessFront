import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSectionResourcesComponent } from './modal-section-resources.component';

describe('ModalSectionResourcesComponent', () => {
  let component: ModalSectionResourcesComponent;
  let fixture: ComponentFixture<ModalSectionResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSectionResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSectionResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
