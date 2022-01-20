import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
      {
        path: 'escenarios',
        loadChildren: () =>
          import('../legal-scenarios/scenarios.module').then(
            (m) => m.ScenariosModule
          ),
      },
      {
        path: 'escenarios-planeacion',
        loadChildren: () =>
          import('../planning-scenarios/planning-scenarios.module').then(
            (m) => m.PlanningScenariosModule
          ),
      },
      {
        path: 'escenarios-subdireccion',
        loadChildren: () =>
          import('../subdirectorate-scenarios/subdirectorate-scenarios.module').then(
            (m) => m.SubdirectorateScenariosModule
          ),
      },
      {
        path: 'usuario',
        loadChildren: () =>
          import('../user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'diagnostico',
        loadChildren: () =>
          import('../planning-scenarios/diagnosis/diagnosis.module').then(
            (m) => m.DiagnosisModule
          ),
      },
      {
        path: 'mantenimientos',
        loadChildren: () =>
          import('../maintenance/maintenance.module').then(
            (m) => m.MaintenanceModule)
      },
      {
        path: 'mantenimientos-correctivos',
        loadChildren: () =>
          import('../corrective-maintenance/corrective-maintenance.module').then(
            (m) => m.CorrectiveMaintenanceModule)
      },
      {
        path: 'garantias',
        loadChildren: () =>
          import('../guarantee-scenarios/guarantee-scenarios.module').then(
            (m) => m.GuaranteeScenariosModule
          ),
      },
      {
        path: 'exportar-actividades-contractuales',
        loadChildren: () =>
          import('../contractual-activities/contractual-activities.module').then(
            (m) => m.ContractualActivitiesModule
          ),
      },
      {
        path: 'intervenciones',
        loadChildren: () =>
          import('../interventions/interventions.module').then(
            (m) => m.InterventionsModule
          ),
      },
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
