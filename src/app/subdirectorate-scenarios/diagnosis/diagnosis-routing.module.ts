import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDiagnosisComponent } from "src/app/planning-scenarios/diagnosis/components/add-diagnosis/add-diagnosis.component";
import { EditDiagnosisComponent } from "src/app/planning-scenarios/diagnosis/components/edit-diagnosis/edit-diagnosis.component";
import { DetailDiagnosisComponent } from './components/detail-diagnosis/detail-diagnosis.component';
import { ListDiagnosisContainer } from './containers/list-diagnosis/list-diagnosis.container';
import { ExportTabComponent } from "src/app/planning-scenarios/diagnosis/components/export-tab/export-tab.component";

const routes: Routes = [
  {
    path:'',
    component: ListDiagnosisContainer
  },
  {
    path:'agregar',
    component: AddDiagnosisComponent,
  },
  {
    path:'editar/:id',
    component: EditDiagnosisComponent,
  },
  {
    path: "detalle/:id",
    component: DetailDiagnosisComponent,
  },
  {
    path: "exportar-ficha-campo",
    component: ExportTabComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosisRoutingModule { }
