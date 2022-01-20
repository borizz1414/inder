import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";
import { switchMap } from 'rxjs/operators';

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { MaintenanceService } from 'src/app/maintenance/services/maintenance.service';
import { UserService } from 'src/app/user-profile/services/user.service';

@Component({
  selector: 'app-detail-maintenance',
  templateUrl: './detail-maintenance.component.html',
  styleUrls: ['./detail-maintenance.component.scss']
})
export class DetailMaintenanceComponent implements OnInit {

  formGroup: FormGroup;
  id = null;
  isLoading = true;
  maintenanceData = null;
  urls = []
  actividadesOptions = [
    {
      id: 1,
      nombre: 'Actividad 1',
    },
    {
      id: 2,
      nombre: 'Actividad 2',
    },
    {
      id: 3,
      nombre: 'Actividad 3',
    },
  ];
  activitySelected: any = {
    actividades_realizar: '',
    frecuencia: '',
    fecha_frecuencia: '',
    responsable: '',
    fecha_inicio: '',
    fecha_fin: '',
    observaciones: '',
    imagenes: []
  };
  responsable = ''

  constructor(
    private fb: FormBuilder,
    private activeRoute : ActivatedRoute,
    private _scenarios : ScenariosService,
    private _maintenance: MaintenanceService,
    private _location: Location,
    private _user: UserService,
  ) {
    this.loadForm();
  }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      switchMap((params: Params) => {
        return this._maintenance.getMaintenance(params.id)
      })
    )
    .subscribe((resp: any) => {
        this.id = resp.data.id;
        this.maintenanceData = resp.data;
        console.log('get maintenance', resp.data);
        
        this.loadFormValues(resp.data);
        this.isLoading = false;
     }, 
     (err: any) => console.log(err),
    )
  }

  getResponsible(id){
    this._user.viewUser(id).subscribe((resp: any) => {
      if (resp) {
        console.log('responsable', resp.data);
        this.formGroup.get('numero_identificacion_responsable').setValue(resp.data.numero_identificacion);
      }
    });
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: [{value: '', disabled: true}, Validators.required],
      estado: [{value: '', disabled: true}, Validators.required],
      nombre_actividad: [{value: ''} , Validators.required],

      actividades_realizar: [{value: '', disabled: true}, Validators.required],
      frecuencia: [{value: '', disabled: true}, Validators.required],
      fecha_frecuencia: [{value: '', disabled: true}, Validators.required],
      responsable: [{value: '', disabled: true}, Validators.required],
      tipo_identificacion_responsable: [{value: '', disabled: true}, Validators.required],
      numero_identificacion_responsable: [{value: '', disabled: true}, Validators.required],
      fecha_inicio: [{value: '', disabled: true}, Validators.required],
      fecha_fin: [{value: '', disabled: true}, Validators.required],
      observaciones: [{value: '', disabled: true}, Validators.required],
    });
  }

  loadFormValues(data){
    this.formGroup.get('nombre_escenario').setValue(data.escenario_deportivo.nombre);
    this.formGroup.get('estado').setValue(data.estado_mantenimiento.nombre);

    this.actividadesOptions = data.actividades
  }

  getActivitySelected(){
    this.urls = []

    this.activitySelected = this.actividadesOptions.find(element => element.id === parseInt(this.formGroup.value.nombre_actividad))
    console.log('activitySelected', this.activitySelected);
    
    this.responsable = `${this.activitySelected.responsable.nombre} ${this.activitySelected.responsable.apellido}`

    this.getResponsible(this.activitySelected.responsable.id)

    this.activitySelected.imagenes = this.activitySelected.imagenes.map((element, index) => {
      this.urls.push(element.url)
      return {
        ...element,
        nombre: `Imagen ${index+1}.${element.url.split(".")[1]}`
      }
    })
  }

  downloadFile(index:string){
    if(this.urls[index]){  

      let params = {
        url: this.urls[index],
        nombre: this.activitySelected.imagenes[index].nombre,
      }

      this._scenarios.downloadFile(params, `image/${this.urls[index].split(".")[1]}`)
    }
  }

  goBack(){
    this._location.back()
  }

}
