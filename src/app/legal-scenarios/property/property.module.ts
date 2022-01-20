import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenariosModule } from '../scenarios.module';
import { SharedModule } from '../../shared/shared.module';

import { PropertyRoutingModule } from './property-routing.module';
import { ListPropertyContainer } from './containers/list-property/list-property.container';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { FormPropertyComponent } from './components/form-property/form-property.component';
import { PersonsFormComponent } from './components/persons-form/persons-form.component';
import { DetailPropertyComponent } from './components/detail-property/detail-property.component';


@NgModule({
  declarations: [ListPropertyContainer, AddPropertyComponent, FormPropertyComponent, PersonsFormComponent, DetailPropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    ScenariosModule,
    SharedModule
  ]
})
export class PropertyModule { }
