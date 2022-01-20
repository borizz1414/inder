import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportsActivitiesListComponent } from './exports-activities-list.component';

describe('ExportsActivitiesListComponent', () => {
  let component: ExportsActivitiesListComponent;
  let fixture: ComponentFixture<ExportsActivitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportsActivitiesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportsActivitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
