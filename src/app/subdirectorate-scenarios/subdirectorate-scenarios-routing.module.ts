import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubdirectorateScenariosComponent } from './subdirectorate-scenarios.component';
import { DashboardContainer } from './containers/dashboard/dashboard.container';
import { ListScenariosContainer } from 'src/app/planning-scenarios/containers/list-scenarios/list-scenarios.container';
import { AddScenarioComponent } from './components/add-scenario/add-scenario.component';
import { DetailScenarioComponent } from 'src/app/planning-scenarios/components/detail-scenario/detail-scenario.component';


const routes: Routes = [
  {
    path: '',
    component: SubdirectorateScenariosComponent,
    children: [
      {
        path: '',
        component: DashboardContainer
      },
      {
        path: 'agregar',
        component: AddScenarioComponent
      },
      {
        path: 'editar/:id',
        component: AddScenarioComponent
      },
      {
        path: 'detalle/:id',
        component: DetailScenarioComponent
      },
      {
        path: 'lista',
        component: ListScenariosContainer
      }
    ],
  },
  {
    path: 'diagnostico',
    loadChildren: () =>
      import('./diagnosis/diagnosis.module').then((m) => m.DiagnosisModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubdirectorateScenariosRoutingModule { }
