import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsubscriptionComponent } from './modalsubscription.component';

describe('ModalsubscriptionComponent', () => {
  let component: ModalsubscriptionComponent;
  let fixture: ComponentFixture<ModalsubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
