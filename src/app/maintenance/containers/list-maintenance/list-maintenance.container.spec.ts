import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaintenanceContainer } from './list-maintenance.container';

describe('ListMaintenanceContainer', () => {
  let component: ListMaintenanceContainer;
  let fixture: ComponentFixture<ListMaintenanceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaintenanceContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaintenanceContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
