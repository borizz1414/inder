import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { GuaranteeService } from '../../services/guarantee.service';
import { SelectOptionsService } from '../../../core/services/select-options.service';


@Component({
  selector: 'app-add-guarantee-container',
  templateUrl: './add-guarantee.container.html',
  styleUrls: ['./add-guarantee.container.scss']
})
export class AddGuaranteeContainer implements OnInit {
  paramsParent = {
    id:null,
    scenario:null
  };
  itemsCollapsed = [];
  emptyProperty;
  showAddAnother = false;
  isDetail = false;
  formOptions = {
    type_guarantee:null
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private _scenarios: ScenariosService,
    private _notifier: NotifierService,
    private _location: Location,
    private _guarantee: GuaranteeService,
    private _selectOptions: SelectOptionsService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getTypeGuarantee();
    this.activeRoute.params.subscribe((params: Params) => {
      this.paramsParent.id = params?.id;
      this.paramsParent.scenario = params?.scenario;
      if(this.paramsParent) {
        if(this.paramsParent.id) this.getGuarantee();
        if(this.paramsParent.scenario) this.getScenario(this.paramsParent.scenario);
      }
    });
  }
  goBack(){
    this._location.back()
  }
  getTypeGuarantee(){
    this._selectOptions.getTypeGuarantee().subscribe((resp) => {
      console.log(resp);
      this.formOptions.type_guarantee = resp.data;
      
    });
  }
  getGuarantee(): void {
    this._guarantee.getGuarantee(this.paramsParent.id).subscribe((resp) => {
      console.log(resp);
      this.itemsCollapsed = [resp.data];
      
    });
  }
  getScenario(idScenario): void {
    this._scenarios.getScenario(idScenario).subscribe((resp) => {
      console.log(resp)
      this.itemsCollapsed = [resp.data];

      
    });
  }

  updateDataChild(event){
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

  saveForm() {
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
