import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScenariosComponent } from './scenarios.component';
import { AddScenarioComponent } from './components/add-scenario/add-scenario.component';
import { DetailsScenarioComponent } from './components/details-scenario/details-scenario.component';
import { ListScenariosContainer } from './containers/scenarios-list/scenarios-list.container';
import { ScenariosContainer } from './containers/scenarios-dashboard/scenarios.container';

const routes: Routes = [
  {
    path: '',
    component: ScenariosComponent,
    children: [
      {
        path: '',
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
        component: DetailsScenarioComponent
      },
      {
        path: 'lista',
        component: ListScenariosContainer
      }
    ],
  },
  {
    path: 'bienes-inmuebles',
    loadChildren: () =>
      import('./property/property.module').then((m) => m.PropertyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenariosRoutingModule { }
