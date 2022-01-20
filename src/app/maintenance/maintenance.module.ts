import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg";

import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { FormMaintenanceComponent } from './components/fom-maintenance/form-maintenance.component';
import { DetailMaintenanceComponent } from './components/detail-maintenance/detail-maintenance.component';
import { ListMaintenanceContainer } from './containers/list-maintenance/list-maintenance.container';
import { FilterListMaintenanceComponent } from './shared/components/filter-list-maintenance/filter-list-maintenance.component';
import { MaintenanceComponent } from './maintenance.component';
import { ListSingleMaintenanceContainer } from './containers/list-single-maintenance/list-single-maintenance.container';
import { ActivitiesFormComponent } from './components/activities-form/activities-form.component';
import { AddMaintenanceComponent } from './containers/add-maintenance/add-maintenance.component';


@NgModule({
  declarations: [FormMaintenanceComponent, DetailMaintenanceComponent, ListMaintenanceContainer, FilterListMaintenanceComponent, MaintenanceComponent, ListSingleMaintenanceContainer, ActivitiesFormComponent, AddMaintenanceComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModule,
    MaterialModule,
    SharedModule,
    InlineSVGModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModule,
    MaterialModule,
    SharedModule,
    InlineSVGModule,
  ]
})
export class MaintenanceModule { }
