import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterventionsListContainer } from './containers/interventions-list/interventions-list.container';
import { DetailsInterventionComponent } from './components/details-intervention/details-intervention.component';
import { AddInterventionContainer } from './containers/add-intervention/add-intervention.container';

const routes: Routes = [
  {
    path:'',
    component:InterventionsListContainer
  },
  {
    path:'agregar',
    component:AddInterventionContainer
  },
  {
    path:'editar/:id',
    component:AddInterventionContainer
  },
  {
    path:'detalle/:id',
    component:DetailsInterventionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventionsRoutingModule { }
