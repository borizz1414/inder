import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance.component';
import { ListMaintenanceContainer } from './containers/list-maintenance/list-maintenance.container';
import { ListSingleMaintenanceContainer } from './containers/list-single-maintenance/list-single-maintenance.container';
import { AddMaintenanceComponent } from './containers/add-maintenance/add-maintenance.component';
import { DetailMaintenanceComponent } from './components/detail-maintenance/detail-maintenance.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
    children: [
      {
        path: '',
        component: ListMaintenanceContainer,
      },
      {
        path: 'agregar',
        component: AddMaintenanceComponent
      },
      {
        path: 'editar/:idScenario/:id',
        component: AddMaintenanceComponent
      },
      {
        path: 'detalle/:id',
        component: DetailMaintenanceComponent
      },
      {
        path: 'lista-escenarios',
        component: ListMaintenanceContainer
      },
      {
        path: 'lista/:id',
        component: ListSingleMaintenanceContainer
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
