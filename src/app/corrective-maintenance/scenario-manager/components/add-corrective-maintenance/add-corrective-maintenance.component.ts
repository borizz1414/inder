import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Observable, BehaviorSubject } from 'rxjs';

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { CorrectiveMaintenanceService } from 'src/app/corrective-maintenance/services/corrective-maintenance.service';
import { NotifierService } from "src/app/core/services/notifier.service";

@Component({
  selector: 'app-add-corrective-maintenance',
  templateUrl: './add-corrective-maintenance.component.html',
  styleUrls: ['./add-corrective-maintenance.component.scss']
})
export class AddCorrectiveMaintenanceComponent implements OnInit {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  formGroup: FormGroup;
  id: string = '';
  images = [];
  isLoadingSave: boolean = false;
  isLoadingData: boolean = false;
  scenarioOptions = []
  typeMaintenanceOptions = []
  scenarioSelected = null

  constructor(
    private fb: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private _location: Location,
    private _scenarios: ScenariosService,
    private _maintenance: CorrectiveMaintenanceService,
    private _notifier: NotifierService,
  ) { 
    // this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    // this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.loadForm();
    this.fetchOptions();

    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params?.id;
      if (this.id) {
        //this.isLoadingSubject.next(true);
        //this.isLoadingData = true;
        //this.getMaintenance();
      }
    });
  }

  getMaintenance(){
    this._maintenance.getMaintenance(this.id).subscribe((resp: any) => {
        console.log('get', resp.data);
        this.id = resp.data.id;
        this.loadFormValues(resp.data);
     }, 
     (err: any) => console.log(err))
  }

  loadFormValues(data){
    this.formGroup.get('nombre_escenario').setValue(data?.nombre || '');
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: ['', Validators.required],
      tipo_mantenimiento: ['', Validators.required],
      observaciones: [''],
    });
  }

  buildBodyCreate(){
    const formValues = this.formGroup.value;
    let formData: any = new FormData();    

    formData.append("nombre_escenario", this.scenarioSelected.id);
    formData.append("tipo_mantenimiento", formValues.tipo_mantenimiento);
    formData.append("observaciones_iniciales", formValues.observaciones);

    if(this.images.length){
      this.images.forEach(element => {
        formData.append("evidencia_inicial[]", element.file);
      })
    }

    //Display the values
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ' - ' + pair[1]);
    }

    return formData;
  }

  buildBodyUpdate(){
    const formValues = this.formGroup.value;
    let formData: any = {};

    formData = {
      "nombre_escenario": formValues.nombre_escenario,
    }

    console.log('formData', formData);
    
    return formData;
  }

  save() {
    this.isLoadingSave = true;
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    this.id ? this.editMaintenance() : this.createMaintenance();
  }

  createMaintenance() {
    const body = this.buildBodyCreate(); 
    this._maintenance.createMaintenance(body).subscribe(
      (resp: any) => {
        console.log("maintenance created ", resp);
        this._notifier.showNotification("", "success");
        this.isLoadingSave = false;
        // this.goBack();
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification(err, "error");
        this.isLoadingSave = false;
      }
    );
  }

  editMaintenance() {
    const scenario = this.buildBodyUpdate()
    // this._scenarios.updateScenario(scenario, this.id).subscribe(
    //   (resp: any) => {
    //     console.log('scenario updated', resp);
    //     this._notifier.showNotification("", "success");
    //     this.goBack();
    //     this.isLoadingSave = false;
    //   },
    //   (err: any) => {
    //     console.log(err);
    //     this._notifier.showNotification("", "error");
    //     this.isLoadingSave = false;
    //   }
    // );
  }

  goBack(){
    this._location.back()
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  getImages(event){
    this.images = event;
    // console.log('get images', this.images);
    
  }

  fetchOptions(){
    this.fetchTypeMaintenanceOptions();
    this.filterScenarioOptions()
    this.fetchScenarioOptions()
  }

  filterScenarioOptions() {
    this.formGroup.get("nombre_escenario").valueChanges.subscribe((value) => {
      this.fetchScenarioOptions(value);

      this.scenarioSelected = this.scenarioOptions.find(
        (item) => item.nombre === value
      ) || null;
      //console.log("scenarioSelected", this.scenarioSelected);
    });
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
        this.scenarioOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }

  fetchTypeMaintenanceOptions(){
    this._maintenance.getTypeMaintenanceOptions().subscribe((resp:any) => {
      this.typeMaintenanceOptions = resp.data
      }, 
     (err: any) => console.log(err),
    )
  }

}
