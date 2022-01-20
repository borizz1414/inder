import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GangRoutingModule } from './gang-routing.module';
import { CorrectiveMaintenanceModule } from "src/app/corrective-maintenance/corrective-maintenance.module";
import { ListCorrectiveMaintenanceContainer } from './containers/list-corrective-maintenance/list-corrective-maintenance.container';
import { AddCorrectiveMaintenanceComponent } from './components/add-corrective-maintenance/add-corrective-maintenance.component';
import { DetailCorrectiveMaintenanceComponent } from './components/detail-corrective-maintenance/detail-corrective-maintenance.component';
@NgModule({
  declarations: [ListCorrectiveMaintenanceContainer, AddCorrectiveMaintenanceComponent, DetailCorrectiveMaintenanceComponent],
  imports: [
    CommonModule,
    GangRoutingModule,
    CorrectiveMaintenanceModule
  ]
})
export class GangModule { }
