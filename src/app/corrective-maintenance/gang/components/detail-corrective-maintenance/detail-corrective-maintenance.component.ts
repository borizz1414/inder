import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";
import { switchMap } from 'rxjs/operators'
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { CorrectiveMaintenanceService } from 'src/app/corrective-maintenance/services/corrective-maintenance.service';
import { UserService } from 'src/app/user-profile/services/user.service';
import { TextModalComponent } from "src/app/shared/components/text-modal/text-modal.component";
@Component({
  selector: 'app-detail-corrective-maintenance',
  templateUrl: './detail-corrective-maintenance.component.html',
  styleUrls: ['./detail-corrective-maintenance.component.scss']
})
export class DetailCorrectiveMaintenanceComponent implements OnInit {

  formGroup: FormGroup;
  id = 1;
  isLoading = true;
  maintenanceData = null;
  imagesInitial = [
    {
      url: '',
      nombre: '',
    },
    {
      url: '',
      nombre: '',
    }
  ]
  imagesDuring = [
    {
      url: '',
      nombre: '',
    },
    {
      url: '',
      nombre: '',
    }
  ]
  imagesFinal = [
    {
      url: '',
      nombre: '',
    },
    {
      url: '',
      nombre: '',
    }
  ]
  rejectionRemarks = [
    'lorem ipsum'
  ]

  configRejectModal = {
    title: "Por favor indica el motivo del porqué rechazó el Mantenimiento",
    bodyText: "",
  };

  configPlanningObservationsModal = {
    title: "Por favor ingresa la observación dirigida al perfil de Planeación",
    bodyText: "",
  };

  configGangObservationsModal = {
    title: "Por favor ingresa la observación dirigida a la cuadrilla",
    bodyText: "",
  };

  constructor(
    private fb: FormBuilder,
    private activeRoute : ActivatedRoute,
    private _scenarios : ScenariosService,
    private _maintenance: CorrectiveMaintenanceService,
    private _location: Location,
    private _user: UserService,
    private modalService: NgbModal,
  ) {
    this.loadForm();
  }

  ngOnInit(): void {
    /*this.activeRoute.params.pipe(
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
    )*/

    this.isLoading = false;
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: [{value: 'Nombre Escenario', disabled: true}, Validators.required],


      prioridad: [{value: '', disabled: true}, Validators.required],
      estado: [{value: 'terminado', disabled: true} , Validators.required],
      tipo_mantenimiento: [{value: '', disabled: true}, Validators.required],
      asignado_a: [{value: '', disabled: true}, Validators.required],
      ayudante: [{value: '', disabled: true}, Validators.required],

      observaciones_inicial: [{value: '', disabled: true}, Validators.required],
      observaciones_durante: [{value: '', disabled: true}, Validators.required],
      observaciones_final: [{value: '', disabled: true}, Validators.required],
    });
  }

  loadFormValues(data){
    // this.formGroup.get('nombre_escenario').setValue(data.escenario_deportivo.nombre);
    // this.formGroup.get('estado').setValue(data.estado_mantenimiento.nombre);
  }

  downloadFile(index: number, imagesArray: string){
    if(this[imagesArray][index]){  

      let params = {
        url: this[imagesArray][index].url,
        nombre: this[imagesArray][index].nombre,
      }

      this._scenarios.downloadFile(params, `image/${this[imagesArray][index].url.split(".")[1]}`)
    }
  }

  openRejectModal(){  
    const modalRef = this.modalService.open(TextModalComponent);
    modalRef.componentInstance.config = this.configRejectModal;
    
    modalRef.componentInstance.confirmText.subscribe((resp: any) => {
      console.log('reject modal text', resp);
      
      modalRef.close();
    });    
  }

  openPlanningObservations(){
    const modalRef = this.modalService.open(TextModalComponent);
    modalRef.componentInstance.config = this.configPlanningObservationsModal;
    
    modalRef.componentInstance.confirmText.subscribe((resp: any) => {
      console.log('planning observations modal text', resp);
      
      modalRef.close();
    });  
  }

  openGangObservations(){
    const modalRef = this.modalService.open(TextModalComponent);
    modalRef.componentInstance.config = this.configPlanningObservationsModal;
    
    modalRef.componentInstance.confirmText.subscribe((resp: any) => {
      console.log('gang observations modal text', resp);
      
      modalRef.close();
    }); 
  }

  approveMaintenance(){

  }

  goBack(){
    this._location.back()
  }

}
