import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuaranteeScenariosRoutingModule } from './guarantee-scenarios-routing.module';
import { GuaranteeComponent } from './guarantee.component';
import { GuaranteeListContainer } from './containers/guarantee-list/guarantee-list.container';
import { SharedModule } from '../shared/shared.module';
import { FilterGuaranteeComponent } from './components/filter-guarantee/filter-guarantee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGuaranteeContainer } from './containers/add-guarantee/add-guarantee.container';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormAddGuaranteeComponent } from './components/form-add-guarantee/form-add-guarantee.component';
import { DetailGuaranteeComponent } from './components/detail-guarantee/detail-guarantee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';
import { GuaranteesOfScenarioContainer } from './containers/guarantees-of-scenario/guarantees-of-scenario.container';


@NgModule({
  declarations: [GuaranteeComponent,GuaranteeListContainer, FilterGuaranteeComponent, AddGuaranteeContainer, FormAddGuaranteeComponent, DetailGuaranteeComponent, GuaranteesOfScenarioContainer],
  imports: [
    CommonModule,
    GuaranteeScenariosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModule,
    MaterialModule,
  ]
})
export class GuaranteeScenariosModule { }
