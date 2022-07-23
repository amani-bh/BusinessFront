import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowprojectComponent } from './showproject.component';

describe('ShowprojectComponent', () => {
  let component: ShowprojectComponent;
  let fixture: ComponentFixture<ShowprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
