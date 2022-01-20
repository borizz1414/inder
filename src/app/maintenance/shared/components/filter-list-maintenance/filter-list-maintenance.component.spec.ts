import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListMaintenanceComponent } from './filter-list-maintenance.component';

describe('FilterListMaintenanceComponent', () => {
  let component: FilterListMaintenanceComponent;
  let fixture: ComponentFixture<FilterListMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterListMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
