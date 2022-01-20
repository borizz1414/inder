import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

import { PlanningScenariosRoutingModule } from './planning-scenarios-routing.module';
import { PlanningScenariosComponent } from './planning-scenarios.component';
import { AddScenarioComponent } from './components/add-scenario/add-scenario.component';
import { DetailScenarioComponent } from './components/detail-scenario/detail-scenario.component';
import { ListScenariosContainer } from './containers/list-scenarios/list-scenarios.container';
import { ScenariosContainer } from './containers/scenarios/scenarios.container';
import { InterventionsFormComponent } from './components/interventions-form/interventions-form.component';
import { FilterListScenariosComponent } from './shared/components/filter-list-scenarios/filter-list-scenarios.component';
import { DiagnosisComponent } from './shared/components/diagnosis/diagnosis.component';
import { InfrastructureComponent } from './shared/components/infrastructure/infrastructure.component';
import { EnvironmentalComponent } from './shared/components/environmental/environmental.component';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { ObjToArrayPipe } from '../shared/components/notification/objToArray.pipe';
import { TypeScenariosDiagnosisModule } from '../type-scenarios-diagnosis/type-scenarios-diagnosis.module';


@NgModule({
  declarations: [PlanningScenariosComponent, AddScenarioComponent, DetailScenarioComponent, ListScenariosContainer, ScenariosContainer, InterventionsFormComponent, FilterListScenariosComponent, DiagnosisComponent, InfrastructureComponent, EnvironmentalComponent],
  imports: [
    CommonModule,
    PlanningScenariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModule,
    MaterialModule,
    SharedModule,
    InlineSVGModule,
    TypeScenariosDiagnosisModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModule,
    MaterialModule,
    SharedModule,
    InlineSVGModule,
    DiagnosisComponent,
    FilterListScenariosComponent
  ]
})
export class PlanningScenariosModule { }
