import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
import { DomSanitizer } from "@angular/platform-browser";
import { switchMap } from 'rxjs/operators';

import { DeleteModalComponent } from "src/app/shared/components/delete-modal/delete-modal.component";
import { ScenariosService } from "src/app/core/services/scenarios.service";
import { MaintenanceService } from "src/app/maintenance/services/maintenance.service";
import { NotifierService } from "src/app/core/services/notifier.service";
@Component({
  selector: "app-form-maintenance",
  templateUrl: "./form-maintenance.component.html",
  styleUrls: ["./form-maintenance.component.scss"],
})
export class FormMaintenanceComponent implements OnInit {
  // ---- Variables as parent component ------ //
  // ---- Maintenance form -----------------//
  activities: any[] = [];
  activitiesSaved: any = [];
  emptyElement;
  showAddAnother = false;
  isDetail = false;

  // ---- Variables as child component ------ //
  // ---- Maintenance form -----------------//
  formGroup: FormGroup;
  isLoadingSave: boolean = false;
  scenariosOptions: any = [];
  scenarioSelected = null;
  imagesIterator = 0

  configDeleteModal = {
    title: "¿Seguro de Eliminar éste Matenimiento?",
    bodyText: "",
  };
  // Variables para el acumulative form
  title: string = "Mantenimiento";
  isCollapsed: boolean = false;
  isEditing: boolean = false;
  isDetailChild: boolean = false;
  // Configuracion de los iconos se van a mostar view, edit y delete
  configCumulative = {
    visible: false,
    edit: false,
    delete: false,
  };
  @Input() idScenario: number; // Id del pabre, condiciona si es crear o editar
  @Input() scenarioData: any; // Data del padre
  @Input() dataChild: any; // Data como hijo (Mantenimiento data)
  @Input() indexDataChild: any; // Index en array de mantenimientos, es diferente que el id.
  @Input() optionsSelect: any; // Opciones para los campos de selección de este form, vienen desde el padre paraque no se hagan múltiples fetch.
  @Output() saveAsChild: EventEmitter<any> = new EventEmitter();
  @Output() formCollapsedAsChild: EventEmitter<any> = new EventEmitter();
  @Output() showDetailAsChild: EventEmitter<any> = new EventEmitter();
  @Output() fetchDataChild: EventEmitter<any> = new EventEmitter();
  @Output() removeFormAsChild: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private _scenarios: ScenariosService,
    private _maintenance: MaintenanceService,
    private _notifier: NotifierService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    // console.log('idScenario in form maintenance', this.idScenario);
    // console.log('scenarioData in form maintenance', this.scenarioData);
    // console.log('data child in form maintenance', this.dataChild);
    // console.log('index data child in form maintenance', this.indexDataChild);  
    // console.log("optionsSelect in form maintenance", this.optionsSelect);
    
    this.title = `Mantenimiento ${this.indexDataChild + 1}`;
    this.scenariosOptions = this.optionsSelect.scenariosOptions;
    
    this.loadForm();
    this.filterScenarioOptions();
  }

  

  // ---- Methods as parent component ------ //
  // ---- Maintenance form -----------------//

  // Inicializa un form para una nueva actividad
  initializeForms() {
    this.emptyElement = {
      id: "",
    };
    this.activities.push(this.emptyElement);
    // console.log('activities', this.activities);
    // console.log('activitiesSaved', this.activitiesSaved);
  }

  // Cuando se colapsa una actividad
  formCollapsed(isCollapsed: boolean) {
    this.showAddAnother = isCollapsed;
  }

  // Cuando se agrega una nueva actividad
  addNewForm() {
    this.initializeForms();
    this.showAddAnother = false;
  }

  // Para cambiar de editing a detail, en este caso no se usa porque solo se va a mostrar eñ form
  showDetail(isDetail: boolean) {
    this.isDetail = isDetail;
  }

  // Cuando se remueve una actividad se quita del array de actividades
  removeForm(indexForm) {
    this.activities.splice(indexForm, 1)
    this.activitiesSaved.splice(indexForm, 1)

    if(this.activities.length === 0){
      this.addNewForm()
    }
  }

  // Obtener actividades guargadas
  getActivities(event){
    this.activitiesSaved[event.index] = event
    console.log('activities', this.activities);
    console.log('activitiesSaved', this.activitiesSaved);
  }



  // ---- Methods as child component ------ //
  // ---- Maintenance form -----------------//
  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: ["", Validators.required],
      estado: ["", Validators.required],
    });

    // Set value form if Edit
    // if idScenario = condicion para ver si es editar o crear
    if(this.idScenario && this.dataChild.id !== ''){
      this.setFormValue()

      this.configCumulative.delete = true;
      this.configCumulative.edit = true;
    }else{
      this.initializeForms()
      this.dataChild = false;
      this.isEditing = true;
    }
  }

  setFormValue(){
    this.formGroup.get('nombre_escenario')
      .setValue(this.dataChild.escenario_deportivo.nombre)

    this.formGroup.get('estado')
      .setValue(this.dataChild.estado_mantenimiento.id)

    const newActivities = this.dataChild.actividades.map(element => ({
      ...element,
      frecuencia: element.frecuencia_actividades_id,
      responsable: element.responsable?.id
    }))
    this.activities = [...newActivities];
    this.activitiesSaved = [...newActivities];

    console.log('formGroup mantenimiento set', this.formGroup.value);
    console.log('activities', this.activities);
    console.log('activitiesSaved', this.activitiesSaved);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.formCollapsedAsChild.emit(this.isCollapsed);
  }

  getDateFormat(date) {
    const { year, month, day } = date;
    const stringDate = `${year}-${month}-${day}`;
    const newDate = moment(stringDate).format("YYYY-MM-DD");

    return newDate;
  }

  buildBody(){
    const formValues = this.formGroup.value;
    let formData: any = new FormData();    

    if(this.scenarioSelected){
      formData.append("nombre_escenario", this.scenarioSelected.id);
    }
    formData.append("estado", formValues.estado);

    if(this.activitiesSaved.length){
      this.activitiesSaved.forEach((element, i) => {
        formData.append("actividad_id[]", []);

        formData.append("actividad_nombre[]", element.nombre_actividad);
        formData.append("actividad_actividades_realizar[]", element.actividades_realizar);
        formData.append("actividad_frecuencia[]", element.frecuencia);
        formData.append("actividad_fecha_frecuencia[]", this.getDateFormat(element.fecha_frecuencia)); // format
        formData.append("actividad_responsable[]", element.responsable); 
        formData.append("actividad_observaciones[]", element.observaciones);
        formData.append("actividad_fecha_inicio[]", this.getDateFormat(element.fecha_inicio)); // format
        formData.append("actividad_fecha_fin[]", this.getDateFormat(element.fecha_fin)); // format

        if(element.imagenes.length){
          element.imagenes.forEach((item, index) => {
            formData.append("imagen_id[]", []);
            formData.append("actividad_auxiliar[]", index+1);
            formData.append("actividad_imagen_id[]", index+1);
            formData.append("actividad_imagen_imagen[]", item.file);
          });
        }else{
          formData.append("actividad_auxiliar[]", i+1);
        }
      });
    }
    
    // Display the values
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ' - ' + pair[1]); 
    }

    return formData;
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

  buildUpdateBody(){
    const formValues = this.formGroup.value;
    let formData: any = {};
    this.imagesIterator = 0

    formData = {
      "nombre_escenario": this.scenarioSelected ? this.scenarioSelected.id : this.idScenario,
      "estado": formValues.estado,
    }

    if(this.activitiesSaved.length){
      formData.actividad_id  = [];
      formData.actividad_auxiliar  = [];
      formData.actividad_nombre = [];
      formData.actividad_actividades_realizar  = [];
      formData.actividad_frecuencia = [];
      formData.actividad_fecha_frecuencia = [];
      formData.actividad_responsable = [];
      formData.actividad_observaciones = [];
      formData.actividad_fecha_inicio = [];
      formData.actividad_fecha_fin = [];
      formData.imagen_id = [];
      formData.actividad_imagen_id = [];
      formData.actividad_imagen_imagen = [];

      this.activitiesSaved.forEach((element, i) => {
        element.id ? 
        formData.actividad_id.push(element.id) : formData.actividad_id.push("");

        formData.actividad_nombre.push(element.nombre || element.nombre_actividad);
        formData.actividad_actividades_realizar.push(element.actividades_realizar);
        formData.actividad_frecuencia.push(element.frecuencia);

        typeof(element.fecha_frecuencia) === 'object' ?
          formData.actividad_fecha_frecuencia.push(this.getDateFormat(element.fecha_frecuencia)) :
          formData.actividad_fecha_frecuencia.push(element.fecha_frecuencia)
        
        formData.actividad_responsable.push(element.responsable);
        formData.actividad_observaciones.push(element.observaciones);

        typeof(element.fecha_inicio) === 'object' ?
          formData.actividad_fecha_inicio.push(this.getDateFormat(element.fecha_inicio)) :
          formData.actividad_fecha_inicio.push(element.fecha_inicio)

        typeof(element.fecha_fin) === 'object' ?
          formData.actividad_fecha_fin.push(this.getDateFormat(element.fecha_fin)) :
          formData.actividad_fecha_fin.push(element.fecha_fin)

        if(element.imagenes.length){
          element.imagenes.forEach(async(item, index) => {
            this.imagesIterator += 1;

            item.id ?
            formData.imagen_id.push(item.id) : formData.imagen_id.push("");
            formData.actividad_auxiliar.push(this.imagesIterator);
            formData.actividad_imagen_id.push(this.imagesIterator); 
            // formData.actividad_auxiliar.push(index+1);
            // formData.actividad_imagen_id.push(index+1);

            if(item.file){
              let base64 = null
              base64 = await this.extraerBase64(item.file)
              
              if(base64) formData.actividad_imagen_imagen.push(base64.base);
              console.log('base64', base64);

              // this.extraerBase64(item.file)
              //   .then((imagen: any) => {
                  
              //   });
            }else{
              formData.actividad_imagen_imagen.push("");
            }

          });
        }//else{
        //   this.imagesIterator += 1;
        //   formData.actividad_auxiliar.push(this.imagesIterator);
        // }

      });
    }

    console.log('formData', formData);
    return formData;
  }

  // Cuando se le da guardar al form de matenimiento
  // Se guarda el mantenimiento con escenario, estado y sus actividades
  // Ya sea crear o editar
  save() {
    this.isLoadingSave = true;
    // console.log("guardando mantenimiento: ", this.indexDataChild);
    // console.log('form values', this.formGroup.value);
    console.log('actividades guardadas', this.activitiesSaved);
    
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }
    this.dataChild.id ? this.editMaintenance() : this.createMaintenance();
  }

  // Crea un mantenimiento
  // Se emite fecthDataChild para actuzalizar la data con los nuevos registros desde el padre
  createMaintenance() {
    const body = this.buildBody();
    
    this._maintenance.createMaintenance(body).subscribe(
      (resp: any) => {
        console.log("register created", resp);
        this.isLoadingSave = false;
        this._notifier.showNotification("", "success");
        this.saveAsChild.emit();
        this.configCumulative.delete = true;
        this.configCumulative.edit = true;
        this.toggleCollapse();
        this.isEditing = false;
        this.fetchDataChild.emit(resp.data?.escenario_deportivo?.id);
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification(err, "error");
        this.isLoadingSave = false;
      }
    );
  }

  // Edita un mantenimiento
  // Se emite fecthDataChild para actuzalizar la data con los nuevos registros desde el padre
  editMaintenance() {
    const body = this.buildUpdateBody();  

    this._maintenance.updateMaintenance(body, this.dataChild.id).subscribe(
      (resp: any) => {
        console.log("register updated", resp);
        this.isLoadingSave = false;
        this._notifier.showNotification("", "success");
        this.saveAsChild.emit();
        this.configCumulative.delete = true;
        this.configCumulative.edit = true;
        this.toggleCollapse();
        this.isEditing = false;
        this.fetchDataChild.emit(resp.data?.escenario_deportivo?.id);
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification(err, "error");
        this.isLoadingSave = false;
      }
    );
  }

  // Cuando se le da al botón delete de mantenimiento
  // Se emite fecthDataChild para actuzalizar la data con los nuevos registros desde el padre
  delete(value) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.config = this.configDeleteModal;

    console.log('entrando en eliminar mantenimiento', value);
    
    modalRef.componentInstance.confirmDelete
      .pipe(
        switchMap((receivedEntry: any) => {
          modalRef.close();
          return this._maintenance.deleteMaintenance(value);
        })
      )
      .subscribe(
        (resp: any) => {
          this._notifier.showNotification("Operación exitosa", "success");
          this.fetchDataChild.emit(null);
        },
        (err) => {
          this._notifier.showNotification("", "error");
        }
      );
  }

  eventCollapse(event) {
    //console.log("eventCollapse formMaintanance", event);
    this.isCollapsed = event.isCollapsed;
    this.isEditing = event.isEditing;
    this.isDetailChild = event.isDetail;
    this.formCollapsedAsChild.emit(this.isCollapsed);
  }

  cancel() {
    this.removeFormAsChild.emit(this.indexDataChild);
    this.toggleCollapse();
    this.configCumulative.edit = true;
    this.configCumulative.delete = true;
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  filterScenarioOptions() {
    this.formGroup.get("nombre_escenario").valueChanges.subscribe((value) => {
      this.fetchScenarioOptions(value);

      this.scenarioSelected = this.scenariosOptions.find(
        (item) => item.nombre === value
      );
      console.log("scenarioSelected", this.scenarioSelected);
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
        this.scenariosOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }
}
