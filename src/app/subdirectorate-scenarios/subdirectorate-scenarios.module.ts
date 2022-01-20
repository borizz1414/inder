import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { PlanningScenariosModule } from '../planning-scenarios/planning-scenarios.module';

import { SubdirectorateScenariosRoutingModule } from './subdirectorate-scenarios-routing.module';
import { AddScenarioComponent } from './components/add-scenario/add-scenario.component';
import { SubdirectorateScenariosComponent } from './subdirectorate-scenarios.component';
import { TypeReservationsComponent } from './components/type-reservations/type-reservations.component';
import { DashboardContainer } from './containers/dashboard/dashboard.container';
import { DivisionsFormComponent } from './components/divisions-form/divisions-form.component';


@NgModule({
  declarations: [AddScenarioComponent, SubdirectorateScenariosComponent, TypeReservationsComponent, DashboardContainer, DivisionsFormComponent],
  imports: [
    CommonModule,
    SubdirectorateScenariosRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    // NgbDatepickerModule,
    // NgbModule,
    // MaterialModule,
    // SharedModule,
    // InlineSVGModule,
    PlanningScenariosModule
  ],
  exports: [
    // FormsModule,
    // ReactiveFormsModule,
    // NgbDatepickerModule,
    // NgbModule,
    // MaterialModule,
    // SharedModule,
    // InlineSVGModule,
    PlanningScenariosModule
  ],
})
export class SubdirectorateScenariosModule { }
