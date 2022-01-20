import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanningScenariosComponent } from './planning-scenarios.component';
import { AddScenarioComponent } from './components/add-scenario/add-scenario.component';
import { DetailScenarioComponent } from './components/detail-scenario/detail-scenario.component';
import { ScenariosContainer } from './containers/scenarios/scenarios.container';
import { ListScenariosContainer } from './containers/list-scenarios/list-scenarios.container';

const routes: Routes = [
  {
    path: 'inicio',
    component: PlanningScenariosComponent,
    children: [
      {
        path: 'inicio',
        component: ScenariosContainer
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
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningScenariosRoutingModule { }
