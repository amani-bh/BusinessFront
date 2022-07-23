import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyclassesComponent } from './myclasses.component';

describe('MyclassesComponent', () => {
  let component: MyclassesComponent;
  let fixture: ComponentFixture<MyclassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyclassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
