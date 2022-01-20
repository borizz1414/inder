import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { ScenariosService } from "src/app/core/services/scenarios.service";
import { NotifierService } from "src/app/core/services/notifier.service";
import { InterventionsService } from "../../services/interventions.service";
import { UserService } from "../../../user-profile/services/user.service";
import { SelectOptionsService } from '../../../core/services/select-options.service';

@Component({
  selector: "app-add-intervention-container",
  templateUrl: "./add-intervention.container.html",
  styleUrls: ["./add-intervention.container.scss"],
})
export class AddInterventionContainer implements OnInit {
  paramsParent = {
    id: null,
  };
  itemsArr = [];
  itemsCollapsed = [];
  emptyProperty;
  showAddAnother = false;
  isDetail = false;
  formOptions = {
    type_id: null,
    users: null,
    funding_source: null,
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private _scenarios: ScenariosService,
    private _notifier: NotifierService,
    private _location: Location,
    private _intervention: InterventionsService,
    private _user: UserService,
    private _selectOptions: SelectOptionsService,
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.fetchOptions();
    this.activeRoute.params.subscribe((params: Params) => {
      this.paramsParent.id = params?.id;
      if (this.paramsParent) {
        if (this.paramsParent.id) this.getIntervention();
      }
    });
  }

  getTypeIds() {
    this._scenarios.getTypeIdOptions().subscribe((resp) => {
      this.formOptions.type_id = resp.data;
    });
  }
  fetchOptions(){
    this.getTypeIds();
    this.getFungingSource()
  }
  getFungingSource() {
    this._selectOptions.getFundingSource().subscribe((resp) => {
      this.formOptions.funding_source = resp.data;
    });
  }
  fetchAutocomplete(event) {
    let params = {
      tipoId: event.type_id,
      numId: event.value,
    };
    console.log(event);
    this.getUsers(params);
  }
  getUsers(params) {
    this._user.getUsersList(params).subscribe((resp) => {
      this.formOptions.users = resp.data;
      console.log("users", resp.data);
    });
  }
  goBack() {
    this._location.back();
  }
  getIntervention(): void {
    this._intervention
      .getIntervention(this.paramsParent.id)
      .subscribe((resp) => {
        console.log(resp);
        this.itemsCollapsed = [resp.data];
      });
  }

  updateDataChild(event) {
    this.itemsCollapsed.map((element,i) =>{
      console.log(element)
      console.log(i)
    })
    this.itemsCollapsed.splice(event, 1);
  }
  initializeForm() {
    this.emptyProperty = {
      id: "",
    };
    this.itemsCollapsed.push(this.emptyProperty);
  }

  saveForm(valueForm) {
    console.log(this.itemsCollapsed, "properties");
    console.log(valueForm, "valueForm");
    this.itemsArr.push(valueForm);
    console.log(this.itemsCollapsed, "properties");
    // this.countIntervensions++;
    this.showAddAnother = true;
  }

  formCollapsed(isCollapsed: boolean) {
    this.showAddAnother = isCollapsed;
  }

  addNewForm() {
    this.initializeForm();
    this.showAddAnother = false;
  }

  showDetail(isDetail: boolean) {
    this.isDetail = isDetail;
  }
}
