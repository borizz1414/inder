import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCorrectiveMaintenanceContainer } from './containers/list-corrective-maintenance/list-corrective-maintenance.container';
import { AddCorrectiveMaintenanceComponent } from './components/add-corrective-maintenance/add-corrective-maintenance.component';
import { DetailCorrectiveMaintenanceComponent } from './components/detail-corrective-maintenance/detail-corrective-maintenance.component';

const routes: Routes = [
  {
    path: '',
    component: ListCorrectiveMaintenanceContainer,
  },
  {
    path: 'realizar-mantenimiento/:id',
    component: AddCorrectiveMaintenanceComponent
  },
  {
    path: 'detalle/:id',
    component: DetailCorrectiveMaintenanceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GangRoutingModule { }
