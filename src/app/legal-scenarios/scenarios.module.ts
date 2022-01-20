import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg";

import { MaterialModule } from "../material/material.module";

import { ScenariosRoutingModule } from "./scenarios-routing.module";
import { ScenariosComponent } from "./scenarios.component";
import { DetailsScenarioComponent } from "./components/details-scenario/details-scenario.component";
import { AddScenarioComponent } from "./components/add-scenario/add-scenario.component";
import { ListScenariosContainer } from "./containers/scenarios-list/scenarios-list.container";
import { SharedModule } from "../shared/shared.module";
import { FilterListScenariosComponent } from "./shared/components/filter-list-scenarios/filter-list-scenarios.component";
import { ScenariosContainer } from "./containers/scenarios-dashboard/scenarios.container";
import { FilterListPropertyComponent } from "./shared/components/filter-list-property/filter-list-property.component";

@NgModule({
  declarations: [
    ScenariosComponent,
    DetailsScenarioComponent,
    AddScenarioComponent,
    ListScenariosContainer,
    FilterListScenariosComponent,
    ScenariosContainer,
    FilterListPropertyComponent,
  ],
  imports: [
    CommonModule,
    ScenariosRoutingModule,
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
    FilterListScenariosComponent,
    FilterListPropertyComponent,
  ],
})
export class ScenariosModule {}
