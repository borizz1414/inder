import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListScenariosContainer } from '../containers/scenarios-list/scenarios-list.container';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { ListPropertyContainer } from './containers/list-property/list-property.container';

const routes: Routes = [
  {
    path:'',
    component:ListPropertyContainer
  },
  {
    path:'agregar',
    component: AddPropertyComponent,
  },
  {
    path:'editar/:id',
    component: AddPropertyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
