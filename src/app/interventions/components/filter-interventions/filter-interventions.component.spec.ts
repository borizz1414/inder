import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterInterventionsComponent } from './filter-interventions.component';

describe('FilterInterventionsComponent', () => {
  let component: FilterInterventionsComponent;
  let fixture: ComponentFixture<FilterInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterInterventionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
