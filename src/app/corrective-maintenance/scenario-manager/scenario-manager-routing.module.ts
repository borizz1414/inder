import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCorrectiveMaintenanceComponent } from './components/add-corrective-maintenance/add-corrective-maintenance.component';

const routes: Routes = [
  {
    path:'agregar',
    component: AddCorrectiveMaintenanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenarioManagerRoutingModule { }
