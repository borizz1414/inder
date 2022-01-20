import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCorrectiveMaintenanceComponent } from './detail-corrective-maintenance.component';

describe('DetailCorrectiveMaintenanceComponent', () => {
  let component: DetailCorrectiveMaintenanceComponent;
  let fixture: ComponentFixture<DetailCorrectiveMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCorrectiveMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCorrectiveMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
