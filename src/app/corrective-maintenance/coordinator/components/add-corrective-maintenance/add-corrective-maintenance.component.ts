import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Observable, BehaviorSubject } from 'rxjs';
import { DomSanitizer } from "@angular/platform-browser";

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { CorrectiveMaintenanceService } from 'src/app/corrective-maintenance/services/corrective-maintenance.service';
import { NotifierService } from "src/app/core/services/notifier.service";
import { UserService } from 'src/app/user-profile/services/user.service';

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
  isLoadingOfficial: boolean = false;
  isLoadingAssistant: boolean = false;

  scenarioOptions = []
  priorityOptions = []
  typeMaintenanceOptions = []
  typeIdOptions = []
  officialOptions = []
  assistantOptions = []

  scenarioSelected = null
  officialSelected = null
  assistantSelected = null

  constructor(
    private fb: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private _location: Location,
    private _scenarios: ScenariosService,
    private _maintenance: CorrectiveMaintenanceService,
    private _notifier: NotifierService,
    private _user: UserService,
    private sanitizer: DomSanitizer,
  ) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.loadForm();

    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params?.id;
      if (this.id) {
        this.isLoadingSubject.next(true);
        this.isLoadingData = true;
        this.getMaintenance();
      }
    });

    this.fetchOptions();
    this.setValidators();
  }

  getMaintenance(){
    this._maintenance.getMaintenance(this.id).subscribe(
     (resp: any) => {
        console.log('get maintenance ', resp.data);
        this.id = resp.data.id;
        this.loadFormValues(resp.data);
        this.isLoadingSubject.next(false);
     }, 
     (err: any) => console.log(err))
  }

  loadFormValues(data){
    this.formGroup.get('nombre_escenario').setValue(data?.escenario_deportivo?.nombre || '');
    this.formGroup.get('prioridad').setValue(data?.prioridad?.id || '');
    this.formGroup.get('tipo_mantenimiento').setValue(data?.tipo_mantenimiento?.id || '');
    this.formGroup.get('tipo_identificacion_oficial').setValue(data.oficial?.tipoidentificacion?.id || '');
    this.formGroup.get('numero_identificacion_oficial').setValue(data.oficial?.numero_identificacion || '');
    this.formGroup.get('tipo_identificacion_ayudante').setValue(data?.ayudante?.tipoidentificacion?.id || '');
    this.formGroup.get('numero_identificacion_ayudante').setValue(data.ayudante?.numero_identificacion || '');
    this.formGroup.get('observaciones_inicial').setValue(data?.observaciones_iniciales || '');

    this.scenarioSelected = data?.escenario_deportivo;
    this.officialSelected = data?.oficial;
    this.assistantSelected = data?.ayudante;

    console.log('scenario selected', this.scenarioSelected);
    console.log('official selected', this.officialSelected);
    console.log('assistant selected', this.assistantSelected);

    this.images = data.imagenes_iniciales.length ? data.imagenes_iniciales.map(item => ({
      progress: 100,
      id: item?.id,
      url: item?.url,
      name: item?.nombre_url,
      file: null,
    })): [];

    this.filterOfficial()
    this.filterAssistant()
    this.filterScenarioOptions()
    this.fetchScenarioOptions()
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: ['', Validators.required],
      prioridad: ['', Validators.required],
      tipo_mantenimiento: ['', Validators.required],
      tipo_identificacion_oficial: [''],
      numero_identificacion_oficial: ['', Validators.required],
      tipo_identificacion_ayudante: [''],
      numero_identificacion_ayudante: ['', Validators.required],
      observaciones_inicial: [''],
    });
  }

  setValidators(){
    const numero_identificacion_ayudante = this.formGroup.get("numero_identificacion_ayudante");

    if (this.id) {
      numero_identificacion_ayudante.setValidators(null);
    } else {
      numero_identificacion_ayudante.setValidators([Validators.required]);
    }

    numero_identificacion_ayudante.updateValueAndValidity();
  }

  extraerBase64 = ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });

  buildBodyCreate(){
    const formValues = this.formGroup.value;
    let formData: any = new FormData();    

    formData.append("nombre_escenario", this.scenarioSelected.id);
    formData.append("tipo_mantenimiento", formValues.tipo_mantenimiento);
    formData.append("prioridad", formValues.prioridad);
    formData.append("identificacion_oficial", this.officialSelected.id);
    formData.append("identificacion_ayudante", this.assistantSelected.id);
    formData.append("observaciones_iniciales", formValues.observaciones_inicial);

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

    console.log('scenario selected 2', this.scenarioSelected);
    

    formData = {
      "nombre_escenario": this.scenarioSelected.id,
      "tipo_mantenimiento": formValues.tipo_mantenimiento,
      "prioridad": formValues.prioridad,
      "identificacion_oficial": this.officialSelected.id,
      "observaciones_iniciales": formValues.observaciones_inicial,
    }

    if(this.assistantSelected?.id){
      formData = {
        ...formData,
        "identificacion_ayudante": this.assistantSelected.id,
      }
    }

    if(this.images.length){
      formData.evidencia_inicial = []
      
      this.images.forEach(async (item) => {
        if(item.file){
          let base64 = null
          base64 = await this.extraerBase64(item.file)
          console.log('base64', base64);

          if(base64) {
            console.log('imagen completa', `${item.file.name}#${base64.base}`);

            formData.evidencia_inicial.push(`${item.file.name}#${base64.base}`);
          }
        }else{
          formData.evidencia_inicial.push("");
        }
      })
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
        this.goBack();
        this.isLoadingSave = false;
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification(err, "error");
        this.isLoadingSave = false;
      }
    );
  }

  editMaintenance(state = null) {
    let body = null;

    if(!state){
      body = this.buildBodyUpdate()
    }else{
      body = {
        estado: 6 // Sin revisar cuadrilla
      }
    }
    
    this._maintenance.updateMaintenance(body, this.id).subscribe(
      (resp: any) => {
        console.log('maintenance updated', resp);
      
        if(!state){
          this.editMaintenance(true);
        }else{
          this._notifier.showNotification("", "success");
          this.goBack();
          this.isLoadingSave = false;
        }
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification("", "error");
        this.isLoadingSave = false;
      }
    );
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
    //console.log('get images', this.images);
  }

  fetchOptions(){
    this.fetchPriorityOptions();
    this.fetchTypeMaintenanceOptions();
    this.fetchTypeIdOptions();

    if(!this.id){
      this.filterOfficial()
      this.filterAssistant()
      this.filterScenarioOptions()
      this.fetchScenarioOptions()
    }
  }

  filterScenarioOptions() {
    this.formGroup.get("nombre_escenario").valueChanges.subscribe((value) => {
      this.fetchScenarioOptions(value);

      if(this.scenarioOptions.length){
        this.scenarioSelected = this.scenarioOptions.find(
          (item) => item.nombre === value
        );
        console.log("scenarioSelected", this.scenarioSelected);
      }
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

  fetchPriorityOptions(){
    this._maintenance.getPriorityOptions().subscribe((resp:any) => {
      this.priorityOptions = resp.data
      }, 
     (err: any) => console.log(err),
    )
  }

  fetchTypeMaintenanceOptions(){
    this._maintenance.getTypeMaintenanceOptions().subscribe((resp:any) => {
      this.typeMaintenanceOptions = resp.data
      }, 
     (err: any) => console.log(err),
    )
  }

  fetchTypeIdOptions(){
    this._scenarios.getTypeIdOptions().subscribe((resp:any) => {
      this.typeIdOptions = resp.data
      }, 
     (err: any) => console.log(err),
    )
  }

  filterOfficial(){  
    this.formGroup.get("numero_identificacion_oficial").valueChanges.subscribe((value) => {
      this.fetchOfficialOptions(value)

      if(this.officialOptions.length){
        this.officialSelected = this.officialOptions.find(item => {
          return parseInt(item.numero_identificacion) === parseInt(value)
        });
        console.log('official selected', this.officialSelected);
      }
    });
  }

  fetchOfficialOptions(search: string = ''): any { 
    //console.log('search', search);
      
    this.isLoadingOfficial = true
    let params: any = { select: 'select'};
    params = { 
      ...params,
      numId: parseInt(search),
    }
    this._user.getUsersList(params).subscribe((resp:any) => {
      this.officialOptions = resp.data
      this.isLoadingOfficial = false
      }, 
      (err: any) => {
        console.log(err)
        this.isLoadingOfficial = false
      })
  }

  filterAssistant(){  
    this.formGroup.get("numero_identificacion_ayudante").valueChanges.subscribe((value) => {
      this.fetchAssistantOptions(value)

      if(this.assistantOptions.length){
        this.assistantSelected = this.assistantOptions.find(item => {
          return parseInt(item.numero_identificacion) === parseInt(value)
        });
        console.log('assistant selected', this.assistantSelected);
      }
    });
  }

  fetchAssistantOptions(search: string = ''): any { 
    //console.log('search', search);

    this.isLoadingAssistant = true
    let params: any = { select: 'select'};
    params = { 
      ...params,
      numId: parseInt(search),
    }
    this._user.getUsersList(params).subscribe((resp:any) => {
      this.assistantOptions = resp.data
      this.isLoadingAssistant = false
      }, 
      (err: any) => {
        console.log(err)
        this.isLoadingAssistant = false
      })
  }

}
