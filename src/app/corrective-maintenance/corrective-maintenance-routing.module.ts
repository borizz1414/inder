import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CorrectiveMaintenanceComponent } from './corrective-maintenance.component';
// import { ListCorrectiveMaintenanceContainer } from './coordinator/containers/list-corrective-maintenance/list-corrective-maintenance.container';
// import { AddCorrectiveMaintenanceComponent } from './coordinator/components/add-corrective-maintenance/add-corrective-maintenance.component';
// import { DetailCorrectiveMaintenanceComponent } from './coordinator/components/detail-corrective-maintenance/detail-corrective-maintenance.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: CorrectiveMaintenanceComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: ListCorrectiveMaintenanceContainer,
  //     },
  //     {
  //       path: 'agregar',
  //       component: AddCorrectiveMaintenanceComponent
  //     },
  //     {
  //       path: 'editar/:id',
  //       component: AddCorrectiveMaintenanceComponent
  //     },
  //     {
  //       path: 'detalle/:id',
  //       component: DetailCorrectiveMaintenanceComponent
  //     },
  //     {
  //       path: 'lista-escenarios',
  //       component: ListCorrectiveMaintenanceContainer
  //     },
  //   ],
  // },
  {
    path: 'coordinación',
    loadChildren: () =>
      import('./coordinator/coordinator.module').then((m) => m.CoordinatorModule),
  },
  {
    path: 'planeación',
    loadChildren: () =>
      import('./planning/planning.module').then((m) => m.PlanningModule),
  },
  {
    path: 'gestor-de-escenario',
    loadChildren: () =>
      import('./scenario-manager/scenario-manager.module').then((m) => m.ScenarioManagerModule),
  },
  {
    path: 'cuadrilla',
    loadChildren: () =>
      import('./gang/gang.module').then((m) => m.GangModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorrectiveMaintenanceRoutingModule { }
