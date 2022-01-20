import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DiagnosisContainer } from "./containers/diagnosis-list/diagnosis.container";
import { AddDiagnosisComponent } from "./components/add-diagnosis/add-diagnosis.component";
import { VersioningContainer } from "./containers/versioning/versioning.container";
import { ExportTabComponent } from "./components/export-tab/export-tab.component";
import { EditDiagnosisComponent } from "./components/edit-diagnosis/edit-diagnosis.component";
import { DetailsDiagnosisComponent } from "./components/details-diagnosis/details-diagnosis.component";
import { VersionHistoryListContainer } from "./containers/version-history-list/version-history-list.container";
import { DashboardContainer } from './containers/dashboard/dashboard.container';

const routes: Routes = [
  {
    path: "inicio",
    component: DashboardContainer,
  },
  {
    path: "lista",
    component: DiagnosisContainer,
  },
  {
    path: "crear",
    component: AddDiagnosisComponent,
  },
  {
    path: "detalle/:id",
    component: DetailsDiagnosisComponent,
  },
  {
    path: "editar/:id",
    component: EditDiagnosisComponent,
  },
  {
    path: "versionamiento",
    component: VersioningContainer,
  },
  {
    path: "versionamiento/editar/:id",
    component: EditDiagnosisComponent,
  },
  {
    path: "versionamiento/detalle/:id",
    component: DetailsDiagnosisComponent,
  },
  {
    path: "versionamiento/historial/:id",
    component: VersionHistoryListContainer,
  },
  {
    path: "exportar-ficha-campo",
    component: ExportTabComponent,
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosisRoutingModule {}
