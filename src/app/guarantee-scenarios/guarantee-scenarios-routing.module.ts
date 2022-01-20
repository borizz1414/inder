import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GuaranteeComponent } from "./guarantee.component";
import { GuaranteeListContainer } from "./containers/guarantee-list/guarantee-list.container";
import { AddGuaranteeContainer } from "./containers/add-guarantee/add-guarantee.container";
import { GuaranteesOfScenarioContainer } from './containers/guarantees-of-scenario/guarantees-of-scenario.container';
import { DetailGuaranteeComponent } from "./components/detail-guarantee/detail-guarantee.component";

const routes: Routes = [

      {
        path: "",
        component: GuaranteeListContainer,
      },
      {
        path: "agregar",
        component: AddGuaranteeContainer,
      },
      {
        path: "agregar/:scenario",
        component: AddGuaranteeContainer,
      },
      {
        path: "ver/:id",
        component: GuaranteesOfScenarioContainer,
      },
      {
        path: "detalle/:id",
        component: DetailGuaranteeComponent,
      },
      {
        path: "editar/:id",
        component: AddGuaranteeContainer,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuaranteeScenariosRoutingModule {}
