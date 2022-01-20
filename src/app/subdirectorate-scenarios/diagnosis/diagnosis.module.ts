import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosisRoutingModule } from './diagnosis-routing.module';
import { PlanningScenariosModule } from '../../planning-scenarios/planning-scenarios.module';
import { DetailDiagnosisComponent } from './components/detail-diagnosis/detail-diagnosis.component';
import { ListDiagnosisContainer } from './containers/list-diagnosis/list-diagnosis.container';

@NgModule({
  declarations: [DetailDiagnosisComponent, ListDiagnosisContainer],
  imports: [
    CommonModule,
    DiagnosisRoutingModule,
    PlanningScenariosModule
  ],
  exports: [
    PlanningScenariosModule,
  ]
})
export class DiagnosisModule { }
