import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCorrectiveMaintenanceContainer } from './list-corrective-maintenance.container';

describe('ListCorrectiveMaintenanceContainer', () => {
  let component: ListCorrectiveMaintenanceContainer;
  let fixture: ComponentFixture<ListCorrectiveMaintenanceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCorrectiveMaintenanceContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCorrectiveMaintenanceContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
