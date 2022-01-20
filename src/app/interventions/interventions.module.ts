import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterventionsRoutingModule } from './interventions-routing.module';
import { InterventionsListContainer } from './containers/interventions-list/interventions-list.container';
import { SharedModule } from '../shared/shared.module';
import { FilterInterventionsComponent } from './components/filter-interventions/filter-interventions.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { MaterialModule } from '../material/material.module';
import { DetailsInterventionComponent } from './components/details-intervention/details-intervention.component';
import { AddInterventionContainer } from './containers/add-intervention/add-intervention.container';
import { FormInterventionComponent } from './components/form-intervention/form-intervention.component';


@NgModule({
  declarations: [InterventionsListContainer,FilterInterventionsComponent, DetailsInterventionComponent, AddInterventionContainer, FormInterventionComponent],
  imports: [
    CommonModule,
    InterventionsRoutingModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModule,
    MaterialModule,
    SharedModule

  ]
})
export class InterventionsModule { }
