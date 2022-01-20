import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";
import { switchMap } from 'rxjs/operators'
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { CorrectiveMaintenanceService } from 'src/app/corrective-maintenance/services/corrective-maintenance.service';
import { TextModalComponent } from "src/app/shared/components/text-modal/text-modal.component";
import { NotifierService } from "src/app/core/services/notifier.service";
@Component({
  selector: 'app-detail-corrective-maintenance',
  templateUrl: './detail-corrective-maintenance.component.html',
  styleUrls: ['./detail-corrective-maintenance.component.scss']
})
export class DetailCorrectiveMaintenanceComponent implements OnInit {

  formGroup: FormGroup;
  id:  string = '';
  isLoading = true;
  maintenanceData = null;
  imagesInitial = []
  imagesDuring = []
  imagesFinal = []
  observacionesRechazo = []

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
    private modalService: NgbModal,
    private _notifier: NotifierService,
  ) {
    this.loadForm();
  }

  ngOnInit(): void {
    // this.activeRoute.params.pipe(
    //   switchMap((params: Params) => {
    //     return this._maintenance.getMaintenance(params.id)
    //   })
    // )
    // .subscribe((resp: any) => {
    //     this.id = resp.data.id;
    //     this.maintenanceData = resp.data;
    //     console.log('get maintenance', resp.data);
        
    //     this.loadFormValues(resp.data);
    //     this.isLoading = false;
    //  }, 
    //  (err: any) => console.log(err),
    // )

    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params?.id;
      if (this.id) {
        this.getMaintenance();
      }
    });
  }

  getMaintenance(){
    this.isLoading = true;
    this._maintenance.getMaintenance(this.id).subscribe(
     (resp: any) => {
        console.log('get maintenance ', resp.data);
        this.id = resp.data.id;
        this.maintenanceData = resp.data;

        this.loadFormValues(resp.data);
        this.isLoading = false;
     }, 
     (err: any) => {
       console.log(err)
       this.isLoading = false;
      }
    )
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: [{value: '', disabled: true}, Validators.required],

      prioridad: [{value: '', disabled: true}, Validators.required],
      estado: [{value: 'rechazado por planeacion', disabled: true} , Validators.required],
      tipo_mantenimiento: [{value: '', disabled: true}, Validators.required],
      asignado_a: [{value: '', disabled: true}, Validators.required],
      ayudante: [{value: '', disabled: true}, Validators.required],

      observaciones_inicial: [{value: '', disabled: true}, Validators.required],
      observaciones_durante: [{value: '', disabled: true}, Validators.required],
      observaciones_final: [{value: '', disabled: true}, Validators.required],
    });
  }

  loadFormValues(data){
    this.formGroup.get('nombre_escenario').setValue(data?.escenario_deportivo?.nombre || '');
    this.formGroup.get('prioridad').setValue(data?.prioridad?.nombre || '');
    this.formGroup.get('estado').setValue(data?.estado?.nombre || '');
    this.formGroup.get('tipo_mantenimiento').setValue(data?.tipo_mantenimiento?.nombre || '');

    this.formGroup.get('asignado_a').setValue(data?.oficial ?  
      `${data.oficial?.nombre} ${data.oficial?.apellido} - ${data.oficial?.numero_identificacion} ` : 'Sin asignar');

    this.formGroup.get('ayudante').setValue(data?.ayudante ?  
      `${data.ayudante?.nombre} ${data.ayudante?.apellido} - ${data.ayudante?.numero_identificacion} ` : 'Sin asignar');

    this.formGroup.get('observaciones_inicial').setValue(data?.observaciones_iniciales || '');
    this.formGroup.get('observaciones_durante').setValue(data?.observaciones_durante || '');
    this.formGroup.get('observaciones_final').setValue(data?.observaciones_finales || '');

    if(data?.imagenes_iniciales.length){
      this.imagesInitial = data.imagenes_iniciales
    }

    if(data?.imagenes_durante.length){
      this.imagesDuring = data.imagenes_durante
    }

    if(data?.imagenes_finales.length){
      this.imagesFinal = data.imagenes_finales
    }

    if(data?.motivos_rechazo){
      this.observacionesRechazo = [data.motivos_rechazo]
    }
  }

  downloadFile(index: number, imagesArray: string){
    if(this[imagesArray][index]){  

      let params = {
        url: this[imagesArray][index].url,
        nombre: this[imagesArray][index].nombre_url, 
        //nombre: `Imagen ${index}`, // Esto es provisional, cambiar luego a la línea de arribapara poder enviar nombre original
      }

      this._scenarios.downloadFile(params, `image/${this[imagesArray][index].url.split(".")[1]}`)
    }
  }

  openRejectModal(){  
    const modalRef = this.modalService.open(TextModalComponent);
    modalRef.componentInstance.config = this.configRejectModal;
    
    modalRef.componentInstance.confirmText.subscribe((resp: any) => {
      console.log('reject modal text', resp);

      this.editMaintenance(null, resp, null, null)
      this.editMaintenance(4, null, null, null)

      modalRef.close();
    });    
  }

  openPlanningObservations(){
    const modalRef = this.modalService.open(TextModalComponent);
    modalRef.componentInstance.config = this.configPlanningObservationsModal;
    
    modalRef.componentInstance.confirmText.subscribe((resp: any) => {
      console.log('planning observations modal text', resp);
      
      this.editMaintenance(null, null, resp, null)
      this.editMaintenance(7, null, null, null)

      modalRef.close();
    });  
  }

  openGangObservations(){
    const modalRef = this.modalService.open(TextModalComponent);
    modalRef.componentInstance.config = this.configPlanningObservationsModal;
    
    modalRef.componentInstance.confirmText.subscribe((resp: any) => {
      console.log('gang observations modal text', resp);

      this.editMaintenance(null, null, null, resp)
      this.editMaintenance(6, null, null, null)

      modalRef.close();
    }); 
  }

  approveMaintenance(){
    this.editMaintenance(7, null, null, null)
  }

  goBack(){
    this._location.back()
  }

  editMaintenance(state: number = null, rejectText = '', planningObser = '', gangObser = '') {
    let body = null;

    if(state){
      body = {
        estado: state
      }
    }else if(rejectText){
      body = {
        motivos_rechazo: rejectText
      }
    }else if(planningObser){
      body = {
        observaciones_para_planeacion: planningObser
      }
    }else if(gangObser){
      body = {
        observaciones_para_cuadrilla: gangObser
      }
    }
    
    this._maintenance.updateMaintenance(body, this.id).subscribe(
      (resp: any) => {
        console.log('maintenance updated', resp);
        if(state){
          this._notifier.showNotification("", "success");  
          this.getMaintenance();
        }
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification("", "error");
      }
    );
  }

}
