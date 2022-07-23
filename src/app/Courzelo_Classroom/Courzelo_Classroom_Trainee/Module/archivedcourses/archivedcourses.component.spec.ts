import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedcoursesComponent } from './archivedcourses.component';

describe('ArchivedcoursesComponent', () => {
  let component: ArchivedcoursesComponent;
  let fixture: ComponentFixture<ArchivedcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedcoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
