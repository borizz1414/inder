import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { MaintenanceService } from 'src/app/maintenance/services/maintenance.service';
import { UserService } from 'src/app/user-profile/services/user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.scss']
})
export class AddMaintenanceComponent implements OnInit {

  idScenario: string;
  maintenances: any = [];
  emptyProperty: any;
  showAddAnother: boolean = false;
  isDetail: boolean = false;
  scenarioData: any = null;
  formOptions: any = {
    scenariosOptions: [],
    stateOptions: [],
    frequencyOptions: [],
    responsibleOptions: [],
    typeIdOptions: []
  }
  loadingData: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private _scenarios: ScenariosService,
    private _maintenance: MaintenanceService,
    private _users: UserService,
    private _notifier: NotifierService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.idScenario = params?.idScenario;
      console.log('idScenario in add', this.idScenario);
    });

    if(this.idScenario){
      this.getAll();
    }else{
      this.initializeForm();
    }
    this.fetchOptions();
  }

  // Trae la data del padre (escenario) con sus respectivos hijos (mantenimientos)
  getAll(): void {
    this.loadingData = true;
    const params = {
      escenario_id: this.idScenario,
    }

    this._maintenance.getAllMaintenances(params).subscribe(
      (resp: any) => {
        console.log('mantenimientos list', resp.data);
      
        if(resp.data.length){
          this.filterAllData(resp.data);
        }else{
          this.loadingData = false;
          this.initializeForm();
        }
      },
      (err: any) => {
        this._notifier.showNotification(
          "Error al obtener los mantenimientos",
          "error"
        )
      }
    ),
    (resp: any) => {
      if(resp.data.length){
        this.filterAllData(resp.data);
      }else{
        this.loadingData = false;
        this.initializeForm();
      }
    };
  }

  // Filtra la data obtenida en el get
  filterAllData(data) {  
    if(data.length){
      this.scenarioData = data[0]?.escenario_deportivo;
      
      this.maintenances = data;
      console.log('maintenances', this.maintenances);
    }
    this.loadingData = false;
    this.formCollapsed(true)
  }

  // Se ejecuta cuando el form hijo se actualiza para que traiga toda la data de nuevo
  updateDataChild(idScenario){
    if(idScenario && !this.idScenario) this.idScenario = idScenario;

    if(this.idScenario){
      this.getAll();
    }
  }

  // Inicializa un nuevo formulario en la lista de forms
  initializeForm() {
    this.emptyProperty = {
      id: "",
    };
    this.maintenances.push(this.emptyProperty);
    console.log('maintenances', this.maintenances);
  }

  // Se ejecuta cuando se termina de crear o editar el formulario hijo
  saveChild() {
    this.showAddAnother = true;
  }

  // Se ejecuta cuando se termina de crear o editar el formulario hijo
  formCollapsed(isCollapsed: boolean) {
    this.showAddAnother = isCollapsed;
  }

  // Se ejecuta cuando se presiona el botón Agregar Otro 
  addNewForm() {
    //this.fetchOptions()
    this.initializeForm();
    this.showAddAnother = false;
  }

  showDetail(isDetail: boolean) {
    this.isDetail = isDetail;
  }

  // Se ejecuta cuando en el formulario hijo se presiona Cancelar
  // Elimina el form de la lista de forms
  removeForm(indexForm){
    this.maintenances.splice(indexForm, 1);
    console.log('maintenances', this.maintenances);
  }

  // Fetch Methods 
  fetchOptions() {
    this.fetchScenarioOptions();
    this.fetchStateOptions();
    this.fetchFrequencyOptions();
    this.fetchTypeIdOptions();
    this.fetchResponsibleOptions();
  }

  fetchScenarioOptions(search = "") {
    let params = null;
    if (search) {
      params = {
        nombre: search,
      };
    }
    this._scenarios.getScenarioOptions(params).subscribe(
      (resp: any) => {
        this.formOptions.scenariosOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }

  fetchStateOptions() {
    this._maintenance.getStateOptions().subscribe(
      (resp: any) => {
        this.formOptions.stateOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }

  fetchFrequencyOptions() {
    this._maintenance.getFrequencyOptions().subscribe(
      (resp: any) => {
        this.formOptions.frequencyOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }

  fetchResponsibleOptions(search: string = ''): any { 
    let params: any = {};
    //let params: any = { select: 'select'};
    params = { 
      ...params,
      //numId: parseInt(search),
    }
    this._users.getUsersList(params).subscribe((resp:any) => {
      this.formOptions.responsibleOptions = resp.data;
     }, 
     (err: any) => console.log(err))
  }

  fetchTypeIdOptions() {
    this._scenarios.getTypeIdOptions().subscribe(
      (resp: any) => {
        this.formOptions.typeIdOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }

  // Misc Method
  goBack(){
    this._location.back()
  }
}
