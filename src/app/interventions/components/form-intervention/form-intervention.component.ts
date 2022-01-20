import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ComponentRef,

} from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { switchMap, finalize } from "rxjs/operators";
import { DeleteModalComponent } from "src/app/shared/components/delete-modal/delete-modal.component";
import { CustomValidators } from "src/app/utils/validators";
import { NotifierService } from '../../../core/services/notifier.service';
import { ScenariosService } from '../../../core/services/scenarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { InterventionsService } from '../../services/interventions.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'app-form-intervention',
  templateUrl: './form-intervention.component.html',
  styleUrls: ['./form-intervention.component.scss'],
})
export class FormInterventionComponent implements OnInit {
  ref:ComponentRef<any>;
  formIntervention: FormGroup;
  nombre_acta_cantidades_finales = new FormControl('');
  configDeleteModal = {
    title: "¿Seguro de Eliminar ésta Intervención?",
    bodyText: "",
  };
  numId;
  userId;
  nameFile = '';
  countForm;
  //Variables para el acumulative form
  title;
  isCollapsed: boolean = false;
  isEditing: boolean = false;
  isDetail: boolean = false;
  /////// Configuracion de los iconos se van a mostar view, edit y delete
  configCumulative = {
    visible:false,
    edit:false,
    delete:false
  }
  typeIdOptions
  isLoadingSave: boolean = false;
  scenariOptions = [];
  idScenario;
  idIntervention;
  fileName

  files = {
    acta_cantidades_finales: null,
  };
  filesNames = {
    acta_cantidades_finales: "",
  };
  //Regular inputs//
  @Input() dataChild;
  @Input() params;
  @Input() formOptions;
  @Input() id;
  @Input() index;
  //--------------------//
  @Input()  items;
  @Output() saveForm: EventEmitter<any> = new EventEmitter();
  @Output() formCollapsed: EventEmitter<any> = new EventEmitter();
  @Output() showDetail: EventEmitter<any> = new EventEmitter();
  @Output() deleteProperty: EventEmitter<any> = new EventEmitter();
  @Output() fetchdataChild: EventEmitter<any> = new EventEmitter();
  @Output() autocompleteEvent: EventEmitter<any> = new EventEmitter();


  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private _notifier: NotifierService,
    private _scenario: ScenariosService,
    private _router: Router,
    private location: Location,
    private activatedRoute:ActivatedRoute,
    private _intervention: InterventionsService,
    private sanitizer: DomSanitizer
  ) {
    
  }

  ngOnInit(): void {
    this.countForm = this.items.length;
    this.loadForms();
    
    // this.isEditing=false;
    // console.log(this.dataChild, 'dataChild')
    // if(this.formOptions.type_id && this.formOptions.funding_sourcer)  this.isEditing=true;

    console.log(this.formOptions,'formOptions')
      console.log(this.items,'items')
      console.log(this.items.length,'items.length')
    


    
  }


  onChangeFile(event: any, fileName: string) {
    let file = event.target.files[0];
    console.log(fileName, "fileName");
    if (this.params.id) {
      this.extraerBase64(file).then((file: any) => {
        console.log("base 64", file);
        this.files[fileName] = file.base;
     
      });

      console.log(file);
    }else{
      this.files[fileName] = file;
    }
    ((document.getElementById("nombre_acta_cantidades_finales"+this.countForm) as HTMLInputElement).value) =file.name;
    // this.nombre_acta_cantidades_finales.setValue(file.name)
    
    // document.getElementById("nombre_acta_cantidades_finales"+this.countForm).setAttribute('value',file.name);
    // this.fileName = file.name;
    // this.formIntervention.get('descripcion').setValue(file.name)
    this.filesNames[fileName] = file.name;
    console.log(this.files,this.filesNames)
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
  });

  setValueForm() {
    // this.numIdUser
    // this.isCollapsed = false;
    // this.configCumulative.delete = false;
    // this.configCumulative.edit = false;
    // this.configCumulative.visible = false;
    if(this.dataChild.escenario_deportivo){
      this.selectScenario(this.dataChild.escenario_deportivo.id);
      this.formIntervention.get('nombre_escenario').setValue(this.dataChild.escenario_deportivo.nombre);

    }
    if(this.dataChild.contratista){
      if(this.dataChild.contratista.tipoidentificacion) this.formIntervention.get('tipo_identificacion_id').setValue(this.dataChild.contratista.tipoidentificacion.id);
      this.formIntervention.get('numero_identificacion').setValue(`${this.dataChild.contratista.numero_identificacion} - ${this.dataChild.contratista.nombre} ${this.dataChild.contratista.apellido}`);
      this.numId =this.dataChild.contratista.numero_identificacion;
      this.userId = this.dataChild.id;
    }
    if(this.dataChild.fuente_financiacion) this.formIntervention.get('fuente_financiacion').setValue(this.dataChild.fuente_financiacion.id);
    // if(this.dataChild.fecha_priorizacion_inicio) this.formIntervention.get('fecha_priorizacion_inicio').setValue(this.dataChild.fecha_priorizacion_inicio);
    // if(this.dataChild.fecha_priorizacion_fin) this.formIntervention.get('fecha_priorizacion_fin').setValue(this.dataChild.fecha_priorizacion_fin);
      
      
    this.nombre_acta_cantidades_finales.setValue(this.dataChild.nombre_acta_cantidades_finales); 
    this.formIntervention.get('contrato').setValue(this.dataChild.contrato);
    this.formIntervention.get('valor').setValue(this.dataChild.valor);
    this.formIntervention.get('descripcion').setValue(this.dataChild.descripcion);
    
    
    let dateStart = moment(this.dataChild.fecha_priorizacion_inicio);
    let dateEnd = moment(this.dataChild.fecha_priorizacion_fin);

    this.formIntervention.get('fecha_priorizacion_inicio').setValue({
      year: dateStart.year(),
      month: dateStart.month() + 1,
      day: dateStart.date(),
    });
    this.formIntervention.get('fecha_priorizacion_fin').setValue({
      year: dateEnd.year(),
      month: dateEnd.month() + 1,
      day: dateEnd.date(),
    });
   
  }
  loadForms() {
    console.log('loadForms')
      this.formIntervention = this.fb.group({
        nombre_escenario: [null, Validators.required],
        tipo_identificacion_id: [6, Validators.required ],
        numero_identificacion: [null, Validators.required],
        contrato: [null, Validators.required],
        valor: [null, Validators.required],
        descripcion: [null],
        fecha_priorizacion_inicio: [null],
        fecha_priorizacion_fin: [null],
        fuente_financiacion: ['', Validators.required],
       
    });

    //Setear form si estas editando 
    // if idScenario = condicion para ver si es editar o crear
    if (this.params && this.params.id) {
      this.title ='Editar Intervención';
      this.isEditing=true;
     this.setValueForm();
    } else {
      this.configCumulative.visible = false;
      this.dataChild = false;
      this.title = `Intervención ${this.countForm+1}`;
      this.isEditing = !this.isEditing;
 
    }
    this.fetchScenarioOptions();
    this.filterScenarioOptions();
  }
  goBack(){
    this.location.back()
  }
  filterScenarioOptions() {
    if (this.isEditing) {
      this.formIntervention.get("nombre_escenario").valueChanges.subscribe((value) => {
        this.fetchScenarioOptions(value);
        this.title = `Intervención ${this.countForm+1} - ${value}`;
        const scenario = this.scenariOptions.find(
          (item) => item.nombre === value
        );
      });
    }
  }
  fetchScenarioOptions(search = "") {
    let params = null;
    if (search) {
      params = {
        nombre: search,
      };
    }
    this._scenario.getScenarioOptions(params).subscribe(
      (resp: any) => {
        this.scenariOptions = resp.data;
        // console.log("opciones de escenarios: ", this.scenariOptions);
      },
      (err: any) => console.log(err)
    );
  }



  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.filterScenarioOptions();
    this.formCollapsed.emit(this.isCollapsed);
  }

  toggleDetail() {
    this.isDetail = !this.isDetail;
    this.showDetail.emit(this.isDetail);
  }

 

  getDateFormat(date) {
    const { year, month, day } = date;
    const stringDate = `${year}-${month}-${day}`;
    const newDate = moment(stringDate).format("YYYY-MM-DD");
    return newDate;
  }




  buildBody() {
    let formData : any = new FormData();
    let formValues= this.formIntervention.value;
    formData.append("nombre_escenario", this.idScenario);
    formData.append("identificacion_contratista", this.numId);
    formData.append("valor", formValues.valor);
    formData.append("fuente_financiacion", formValues.fuente_financiacion);
    if(formValues.contrato) formData.append("contrato", formValues.contrato);
    if(formValues.descripcion) formData.append("descripcion", formValues.descripcion);
    if(formValues.fecha_priorizacion_inicio) formData.append("fecha_priorizacion_inicio", this.getDateFormat(formValues.fecha_priorizacion_inicio));
    if(formValues.fecha_priorizacion_fin)  formData.append("fecha_priorizacion_fin", this.getDateFormat(formValues.fecha_priorizacion_fin));
    if(this.files.acta_cantidades_finales){
      formData.append("acta_cantidades_finales", this.files.acta_cantidades_finales);
    }
    return formData;
  }

  save() {
    this.formIntervention.markAllAsTouched();
 

    if (!this.formIntervention.valid) return;
    if(this.idIntervention){
      this.isLoadingSave = true;
      this.params = this.idIntervention;
      const intervention = this.buildObj();
      return this.updateIntervention(intervention);
    }

    if (!this.params.id) {
      console.log('create form')
      if(this.numId == undefined) return this._notifier.showNotification(['Selecciona la identificación del contratista'], "error");
      if(this.idScenario  == undefined) return this._notifier.showNotification(['Selecciona un escenario deportivo'], "error");
      const intervention = this.buildBody();
      this.createIntervention(intervention);

    } else {
      this.isLoadingSave = true;
      const intervention = this.buildObj();
      this.updateIntervention(intervention);
    }


  }
  selectScenario(id){
    this.idScenario = id;
  }
  buildObj(){
    let objIntervention;
    const form = this.formIntervention.value;
    console.log(this.files['acta_cantidades_finales'],'acta_cantidades_finales');
    if(form.fecha_priorizacion_inicio) {
      form.fecha_priorizacion_inicio = this.getDateFormat(form.fecha_priorizacion_inicio);
    }
    if(form.fecha_priorizacion_fin) {
      form.fecha_priorizacion_fin = this.getDateFormat(form.fecha_priorizacion_fin);
    }
    form.nombre_escenario= this.idScenario;
    form.numero_identificacion= this.numId;
    form.identificacion_contratista= this.userId;
    if(this.files['acta_cantidades_finales']!=null){
      return objIntervention = {
        ...this.formIntervention.value,acta_cantidades_finales:`${this.filesNames['acta_cantidades_finales']}#${this.files['acta_cantidades_finales']}`
      }
    }else{
      return objIntervention = this.formIntervention.value;
    }
  
    
  }
  updateIntervention(intervention){
    console.log(intervention,'intervention')
    let id;
    !this.params.id ? id=this.idIntervention : id=this.params.id;
    this._intervention.updateIntervention(intervention,id).subscribe(
      (resp: any) => {
        console.log("guarantee edite ", resp);
        this._notifier.showNotification("", "success");
        this.isLoadingSave = false;
        if(this.params.id) this.goBack();
        this.toggleCollapse();

      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification(err, "error");
        this.isLoadingSave = false;
      }
    );
  }
  createIntervention(intervention){
    this.isLoadingSave = true;
    this._intervention.createIntervention(intervention).subscribe(
      (resp) => {
        console.log("Intervention created ", resp);
        this.idIntervention = resp.data.id;
        this.saveForm.emit(resp.data)
        this._notifier.showNotification("", "success");
        this.isLoadingSave = false;
        this.configCumulative.edit = true;
        this.configCumulative.delete = true;
        this.toggleCollapse();
        this.nombre_acta_cantidades_finales.setValue('')
        this.files.acta_cantidades_finales = null;
        this.filesNames.acta_cantidades_finales = '';
        this.fileName='';
        ((document.getElementById("nombre_acta_cantidades_finales"+this.countForm) as HTMLInputElement).value) =resp.data.nombre_acta_cantidades_finales;
        // this.loadForms();
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification(err, "error");
        this.isLoadingSave = false;
      }
    );
    
  }


  delete(value) {
    console.log(value)
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.config = this.configDeleteModal;

    modalRef.componentInstance.confirmDelete
      .pipe(
        switchMap((receivedEntry: any) => {
          modalRef.close();
          return this._intervention.deleteIntervention(this.idIntervention);
        })
      )
      .subscribe(
        (resp: any) => {
          this._notifier.showNotification("Operación exitosa", "success");
          this.fetchdataChild.emit(this.index);
         
        },
        (err) => {
          this._notifier.showNotification("", "error");
        }
      );
  }

  edit() {
    // this.idScenario == undefined ? this.toggleCollapse() : this.isCollapsed = !this.isCollapsed;
    // this.isCollapsed= false;
    this.isEditing = !this.isEditing;
    if (this.isCollapsed) {
      console.log('this.datachild',this.dataChild)
      // if(this.idScenario){
      //   if (this.dataChild.tipocontrato.id == 2) this.changeDependence();
      // }
      this.isCollapsed = false;
    }

    this.filterScenarioOptions();
  }

  detailVisible() {
    this.isEditing = false;
    if (this.isCollapsed) this.isCollapsed = false;
    this.toggleDetail();
  }
  changeDetailToEdit() {
    this.toggleDetail();
    this.isEditing = true;
  }



  controlHasError(validation: string, controlName: string) {
    const control = this.formIntervention.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  eventCollapse(event){
    console.log(event)
    this.isCollapsed = event.isCollapsed;
    this.isEditing = event.isEditing;
    this.isDetail = event.isDetail;
  }
  selectUser(value){
    this.numId = value.numero_identificacion;
    this.userId = value.id;
    this.formIntervention.get('numero_identificacion').setValue(`${value.numero_identificacion} - ${value.nombre}`);
  }
  searchUser(type){
    
    let form =this.formIntervention.value;
    let value;
    type== 'users' ? value = this.numId : value = '';
    const objEmit= {
      type_id:`${form.tipo_identificacion_id}`,
      type:type,
      value:value
    }
    this.autocompleteEvent.emit(objEmit);
  }
}
