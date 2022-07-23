import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourzeloCorehomeComponent } from './courzelo-corehome.component';

describe('CourzeloCorehomeComponent', () => {
  let component: CourzeloCorehomeComponent;
  let fixture: ComponentFixture<CourzeloCorehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourzeloCorehomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourzeloCorehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
