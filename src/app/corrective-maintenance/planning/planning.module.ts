import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import { CorrectiveMaintenanceModule } from "src/app/corrective-maintenance/corrective-maintenance.module";

import { DetailCorrectiveMaintenanceComponent } from './components/detail-corrective-maintenance/detail-corrective-maintenance.component';
@NgModule({
  declarations: [DetailCorrectiveMaintenanceComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    CorrectiveMaintenanceModule
  ]
})
export class PlanningModule { }
