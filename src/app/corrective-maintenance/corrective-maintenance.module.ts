import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg";

import { MaterialModule } from "src/app/material/material.module";
import { SharedModule } from "src/app/shared/shared.module";

import { CorrectiveMaintenanceRoutingModule } from './corrective-maintenance-routing.module';
import { CorrectiveMaintenanceComponent } from './corrective-maintenance.component';
import { FilterListComponent } from './shared/filter-list/filter-list.component';


@NgModule({
  declarations: [CorrectiveMaintenanceComponent, FilterListComponent],
  imports: [
    CommonModule,
    CorrectiveMaintenanceRoutingModule,
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
    FilterListComponent
  ]
})
export class CorrectiveMaintenanceModule { }
