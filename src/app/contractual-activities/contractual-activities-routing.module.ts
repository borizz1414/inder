import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportsActivitiesListContainer } from './containers/exports-activities-list/exports-activities-list.container';

const routes: Routes = [
  {
    path:'',
    component:ExportsActivitiesListContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractualActivitiesRoutingModule { }
