import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { DomSanitizer } from "@angular/platform-browser";

import { DeleteModalComponent } from "src/app/shared/components/delete-modal/delete-modal.component";
import { UserService } from 'src/app/user-profile/services/user.service';
@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.scss'],
})
export class ActivitiesFormComponent implements OnInit {

  formActivities: FormGroup;
  id: string;
  images = [];
  responsableOptions = []
  isLoadingResposible: boolean = false
  responsableSelected = null;
  fechaFrecuencia = null;
  fechaInicio = null;
  fechaFin = null;

  configDeleteModal = {
    title: "¿Seguro de Eliminar ésta Actividad?",
    bodyText: "",
  };

  //Variables para el acumulative form
  titleChild : string = 'Actividad'
  isCollapsedChild: boolean = false;
  isEditingChild: boolean = false;
  isDetailChild: boolean = false;

  //Configuracion de los iconos se van a mostar view, edit y delete
  configCumulative = {
    visible:false,
    edit:false,
    delete:false
  }

  @Input() idMaintenance: number; // Condiciona si es crear o editar
  @Input() maintenance: any;
  @Input() dataChild: any; // Activity data
  @Input() indexDataChild: any; // Index in activities array, is different that id.
  @Input() optionsSelect: any; // Opciones para los campos de selección de este form, vienen desde el padre paraque no se hagan múltiples fetch.
  @Output() formCollapsed: EventEmitter<any> = new EventEmitter();
  @Output() showDetail: EventEmitter<any> = new EventEmitter();
  @Output() removeForm: EventEmitter<any> = new EventEmitter();
  @Output() sendActivities: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder, 
    private modalService: NgbModal,
    private _users: UserService,
    private sanitizer: DomSanitizer,
    private _user: UserService,
  ) { }

  ngOnInit(): void {
    // console.log('data child in form activity', this.dataChild);
    // console.log('index data child in form activity', this.indexDataChild);  
    // console.log('optionsSelect in form activity', this.optionsSelect);

    this.responsableOptions = this.optionsSelect.responsibleOptions;
    this.titleChild = `Actividad ${this.indexDataChild + 1}`;
    
    this.loadForm();
    this.filterResponsible()
  }

  loadForm() {
    this.formActivities = this.fb.group({
      nombre_actividad: ['', Validators.required],
      actividades_realizar: ['', Validators.required],
      frecuencia: ['', Validators.required],
      fecha_frecuencia: ['', Validators.required],
      tipo_identificacion: [''],
      numero_identificacion:['', Validators.required],
      responsable: [{ value: "", disabled: true }],
      observaciones: [''],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });

    // Set value form if Edit
    // if idMaintenance = condicion para ver si es editar o crear
    if (this.idMaintenance && this.dataChild.id !== "") {
      this.getResponsible(this.dataChild.responsable)

      this.toggleCollapse()
      this.configCumulative.delete = true;
      this.configCumulative.edit = true;
    } else {
      this.dataChild = false;
      this.isEditingChild = true;
    }
  }

  getResponsible(id){
    this._user.viewUser(id).subscribe((resp: any) => {
      if (resp) {
        //console.log('responsable', resp.data);
        this.responsableSelected = resp.data;

        this.setValueForm()
      }
    });
  }

  setValueForm() {
    console.log('seteando actividad', this.dataChild);
    
    this.formActivities.get('nombre_actividad').setValue(this.dataChild.nombre)
    this.formActivities.get('actividades_realizar').setValue(this.dataChild.actividades_realizar)
    this.formActivities.get('frecuencia').setValue(this.dataChild.frecuencia || '')
    
    const dateFrecuencia = moment(this.dataChild.fecha_frecuencia);  
    this.fechaFrecuencia = {
      year: dateFrecuencia.year(),
      month: dateFrecuencia.month() + 1,
      day: dateFrecuencia.date(),
    };

    this.formActivities.get('tipo_identificacion')
      .setValue(this.dataChild.responsable?.tipoidentificacion?.id)
      
    this.formActivities.get('numero_identificacion')
      .setValue(this.responsableSelected?.numero_identificacion)

    this.formActivities.get('responsable')
      .setValue(`${this.dataChild.responsable?.nombre || ''} ${this.dataChild.responsable?.apellido || ''}`)

    this.formActivities.get('observaciones').setValue(this.dataChild.observaciones)

    const dateInicio = moment(this.dataChild.fecha_inicio);  
    this.fechaInicio = {
      year: dateInicio.year(),
      month: dateInicio.month() + 1,
      day: dateInicio.date(),
    };

    const dateFin = moment(this.dataChild.fecha_fin);  
    this.fechaFin = {
      year: dateFin.year(),
      month: dateFin.month() + 1,
      day: dateFin.date(),
    };

    // De ser necesario, obtener imágenes aquí mediante request showFile
    // Se debe obtener cada una, almacenar en un array y luego asignar al campo file cada una

    this.images = this.dataChild.imagenes.length ? this.dataChild.imagenes.map(item => ({
      progress: 100,
      id: item?.id,
      url: item?.url,
      file: null,
    })): [];

    // console.log('set images', this.images);
  }

  /*showFile(url){
    let params = {
      url,
    }
    this._user.showFile(params).subscribe((resp: any) => {
      if (resp) {
        const file = new File([resp], url,  {
          type: "image/png",
        });
  
        this.extraerBase64(file).then((imagen: any) => {
          this.image64 = imagen.base;
        });
      }
    });
  }

  extraerBase64 = async ($event: any) =>
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
    });*/

  toggleCollapse() {  
    this.isCollapsedChild = !this.isCollapsedChild;
    this.formCollapsed.emit(this.isCollapsedChild);
  }

  save() {
    //console.log('saving activity form', this.formActivities.value);
    this.formActivities.markAllAsTouched();
    this.toggleCollapse();
    this.configCumulative.edit = true;
    this.configCumulative.delete = true;

    if (!this.formActivities.valid) {
      return;
    }

    // Emitir la info de cada actividad al componente padre, 
    // form-maintenance, en donde se va a almacenar en un array
    // y se almacenan todas cuando se crea el mantenimiento
    const data = {
      ...this.formActivities.value,
      responsable: this.responsableSelected?.id,
      id: this.dataChild?.id || null,
      index: this.indexDataChild,
      imagenes: this.images,
    }
    this.sendActivities.emit(data);
    //console.log('send activity', data);
  }

  delete(value) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.config = this.configDeleteModal;
    
    modalRef.componentInstance.confirmDelete.subscribe((resp: any) => {
      modalRef.close();
      this.removeForm.emit(this.indexDataChild); 
    });
  }

  eventCollapseChild(event){
    //console.log('eventCollapse activitiesMaintanance', event)
    this.isCollapsedChild = event.isCollapsed;
    this.isEditingChild = event.isEditing;
    this.isDetailChild = event.isDetail;
    this.formCollapsed.emit(this.isCollapsedChild);
  }

  cancel(){
    this.removeForm.emit(this.indexDataChild);
    this.toggleCollapse();
    this.configCumulative.edit = true;
    this.configCumulative.delete = true;
  }

  filterResponsible(){  
    this.formActivities.get("numero_identificacion").valueChanges.subscribe((value) => {
      this.fetchResponsibleOptions(value)

      this.responsableSelected = this.responsableOptions.find(item => {
        return parseInt(item.numero_identificacion) === parseInt(value)
      }) || null;

      this.formActivities.get('responsable')
      .setValue(this.responsableSelected ? `${this.responsableSelected.nombre} ${this.responsableSelected.apellido}` : '')
    });
  }

  fetchResponsibleOptions(search: string = ''): any { 
    this.isLoadingResposible = true
    let params: any = { select: 'select'};
    params = { 
      ...params,
      numId: parseInt(search),
    }
    this._users.getUsersList(params).subscribe((resp:any) => {
      this.responsableOptions = resp.data
      this.isLoadingResposible = false
     }, 
     (err: any) => {
       console.log(err)
       this.isLoadingResposible = false
     })
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formActivities.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  getImages(event){
    this.images = event;
    // console.log('get images', this.images);
    
  }
}
