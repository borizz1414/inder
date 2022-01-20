import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosisRoutingModule } from './diagnosis-routing.module';
import { FilterListDiagnosisComponent } from '../shared/components/filter-list-diagnosis/filter-list-diagnosis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddDiagnosisComponent } from './components/add-diagnosis/add-diagnosis.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { MaterialModule } from '../../material/material.module';
import { ExportTabComponent } from './components/export-tab/export-tab.component';
import { VersioningContainer } from './containers/versioning/versioning.container';
import { DetailsDiagnosisComponent } from './components/details-diagnosis/details-diagnosis.component';
import { EditDiagnosisComponent } from './components/edit-diagnosis/edit-diagnosis.component';
import { VersionHistoryListContainer } from './containers/version-history-list/version-history-list.container';
import { DashboardContainer } from './containers/dashboard/dashboard.container';
import { DiagnosisContainer } from './containers/diagnosis-list/diagnosis.container';
import { PlanningScenariosModule } from '../planning-scenarios.module';



@NgModule({
  declarations: [FilterListDiagnosisComponent, DiagnosisContainer, AddDiagnosisComponent, ExportTabComponent, VersioningContainer, DetailsDiagnosisComponent, EditDiagnosisComponent, VersionHistoryListContainer, DashboardContainer],
  exports:[DashboardContainer],
  imports: [
    PlanningScenariosModule,
    CommonModule,
    DiagnosisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InlineSVGModule,
    MaterialModule,
    
  ]
})
export class DiagnosisModule { }
