import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSingleMaintenanceContainer } from './list-single-maintenance.container';

describe('ListSingleMaintenanceContainer', () => {
  let component: ListSingleMaintenanceContainer;
  let fixture: ComponentFixture<ListSingleMaintenanceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSingleMaintenanceContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSingleMaintenanceContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
