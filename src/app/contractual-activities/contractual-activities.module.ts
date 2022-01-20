import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractualActivitiesRoutingModule } from './contractual-activities-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ExportsActivitiesListContainer } from './containers/exports-activities-list/exports-activities-list.container';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ExportsActivitiesListContainer],
  imports: [
    CommonModule,
    ContractualActivitiesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ]
})
export class ContractualActivitiesModule { }
