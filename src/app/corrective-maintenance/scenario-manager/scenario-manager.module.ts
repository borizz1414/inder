import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenarioManagerRoutingModule } from './scenario-manager-routing.module';
import { CorrectiveMaintenanceModule } from "src/app/corrective-maintenance/corrective-maintenance.module";
import { AddCorrectiveMaintenanceComponent } from './components/add-corrective-maintenance/add-corrective-maintenance.component';
@NgModule({
  declarations: [AddCorrectiveMaintenanceComponent],
  imports: [
    CommonModule,
    ScenarioManagerRoutingModule,
    CorrectiveMaintenanceModule
  ]
})
export class ScenarioManagerModule { }
