import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardsModule } from '../../theme/partials/content/dashboards/dashboards.module';
import { DiagnosisModule } from '../../planning-scenarios/diagnosis/diagnosis.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    DiagnosisModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    DashboardsModule,
  ],
})
export class DashboardModule {}
