import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ScenariosService } from "../../../../core/services/scenarios.service";
import { NotifierService } from "../../../../core/services/notifier.service";
import { filter, map, max } from "rxjs/operators";

@Component({
  selector: "app-add-property",
  templateUrl: "./add-property.component.html",
  styleUrls: ["./add-property.component.scss"],

})
export class AddPropertyComponent implements OnInit {
  id: string;
  properties = [];
  response;
  emptyProperty;
  showAddAnother = false;
  isDetail = false;
  filterData;
  params: Params = {};
  endpointParam: string = null;
  formOptions = {
    typeContractOptions: null,
    dispositionOptions: null,
    typeIdOptions: null,
    dependenceOptions: null,
    strategyOptions: null,
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private _scenarios: ScenariosService,
    private _notifier: NotifierService
  ) {
    this.initializeForm();
    this.getAllProperty(this.params);
    this.fetchOptions();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params?.id;
    });
  }

  getAllProperty(params: Object): void {
    this._scenarios
      .getOneLegalProperty(params, this.endpointParam, this.id)
      .subscribe(
        (resp: any) => {
          this.filteringData(resp);
        },
        (err: any) =>
          this._notifier.showNotification(
            "Error al obtener el Bien Inmueble",
            "error"
          )
      ),
      (resp: any) => this.filteringData(resp);
  }
  filteringData(resp) {
    resp.data.find((element: any, index) => {
      if (this.id == element.id) {
        this.response = element;
        this.filterData = element;
        this.properties = element.bienesjuridicos;
      }
    });
  }
  updateDataChild(event){
    this.getAllProperty(this.params)
  }
  initializeForm() {
    this.emptyProperty = {
      id: "",
    };
    this.properties.push(this.emptyProperty);
  }

  saveProperty() {
    this.showAddAnother = true;
  }

  formCollapsed(isCollapsed: boolean) {
    this.showAddAnother = isCollapsed;
  }

  addNewForm() {
    this.fetchOptions()
    this.initializeForm();
    this.showAddAnother = false;
  }

  showDetail(isDetail: boolean) {
    this.isDetail = isDetail;
  }
  fetchOptions() {
    this.fetchDispositionOptions();
    this.fetchTypeIdOptions();
    this.fetchTypeContractOptions();
    this.fetchDependenceOptions();
  }



  fetchDispositionOptions() {
    this._scenarios.getDispositionOptions().subscribe(
      (resp: any) => {
        this.formOptions.dispositionOptions = resp.data;
        // this._scenarios.selectOptions.emit(this.formOptions);
        // console.log("emit de disposition: ", this.formOptions);
      },
      (err: any) => console.log(err)
    );
  }
  fetchTypeContractOptions() {
    this._scenarios.getTypeContractOptions().subscribe(
      (resp: any) => {
        this.formOptions.typeContractOptions = resp.data;
        // this._scenarios.selectOptions.emit(this.formOptions);
        // console.log("emit de typeContractOptions: ", this.formOptions);
      },
      (err: any) => console.log(err)
    );
  }

  fetchTypeIdOptions() {
    this._scenarios.getTypeIdOptions().subscribe(
      (resp: any) => {
        this.formOptions.typeIdOptions = resp.data;
        // this._scenarios.selectOptions.emit(this.formOptions);
        // console.log("emit tipo de identidicacion: ", this.formOptions);
      },
      (err: any) => console.log(err)
    );
  }

  fetchDependenceOptions() {
    this._scenarios.getDependenceOptions().subscribe(
      (resp: any) => {
        this.formOptions.dependenceOptions = resp.data;
        // this._scenarios.selectOptions.emit(this.formOptions);
        // console.log("emit tipo de depedence: ", this.formOptions);
      },
      (err: any) => console.log(err)
    );
  }

  fetchStrategyOptions(dependenceId) {
    this._scenarios.getStrategyOptions(dependenceId).subscribe(
      (resp: any) => {
        this.formOptions.strategyOptions = resp.data;
        // this._scenarios.selectOptions.emit(this.formOptions);
        // console.log("emit tipo de strategia: ", this.formOptions);
      },
      (err: any) => console.log(err)
    );
  }
}
