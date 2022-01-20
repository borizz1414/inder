import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorrectiveMaintenanceComponent } from './add-corrective-maintenance.component';

describe('AddCorrectiveMaintenanceComponent', () => {
  let component: AddCorrectiveMaintenanceComponent;
  let fixture: ComponentFixture<AddCorrectiveMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCorrectiveMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorrectiveMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
