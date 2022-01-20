import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,

} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { switchMap, finalize } from "rxjs/operators";
import { DeleteModalComponent } from "src/app/shared/components/delete-modal/delete-modal.component";
import { CustomValidators } from "src/app/utils/validators";
import { NotifierService } from '../../../core/services/notifier.service';
import { GuaranteeService } from '../../services/guarantee.service';
import { ScenariosService } from '../../../core/services/scenarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";



@Component({
  selector: 'app-form-add-guarantee',
  templateUrl: './form-add-guarantee.component.html',
  styleUrls: ['./form-add-guarantee.component.scss']
})
export class FormAddGuaranteeComponent implements OnInit {
  formGuarantee: FormGroup;
  configDeleteModal = {
    title: "¿Seguro de Eliminar ésta Garantía?",
    bodyText: "",
  };
  

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

  isLoadingSave: boolean = false;
  scenariOptions = [];
  idScenario;
  idGuarantee;

  @Input() dataChild;
  @Input() params;
  @Input() formOptions;
  @Input() index;
  @Output() saveForm: EventEmitter<any> = new EventEmitter();
  @Output() formCollapsed: EventEmitter<any> = new EventEmitter();
  @Output() showDetail: EventEmitter<any> = new EventEmitter();
  @Output() deleteProperty: EventEmitter<any> = new EventEmitter();
  @Output() fetchdataChild: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private _guarantee: GuaranteeService,
    private _notifier: NotifierService,
    private _scenario: ScenariosService,
    private _router: Router,
    private location: Location,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadForms();
   
    
  }


  setValueForm() {

    this.isCollapsed = false;
    this.configCumulative.delete = false;
    this.configCumulative.edit = false;
    this.configCumulative.visible = false;
    if(this.dataChild.escenario_deportivo){
      this.selectScenario(this.dataChild.escenario_deportivo.id);
      this.formGuarantee.get('nombre_escenario').setValue(this.dataChild.escenario_deportivo.nombre);
    }
    this.formGuarantee.get('tipo_garantia').setValue(this.dataChild.tipo_garantias_id);
    this.formGuarantee.get('observaciones').setValue(this.dataChild.observaciones);

    let dateStart = moment(this.dataChild.fecha_inicio);
    let dateEnd = moment(this.dataChild.fecha_fin);

    this.formGuarantee.get('fecha_inicio').setValue({
      year: dateStart.year(),
      month: dateStart.month() + 1,
      day: dateStart.date(),
    });
    this.formGuarantee.get('fecha_fin').setValue({
      year: dateEnd.year(),
      month: dateEnd.month() + 1,
      day: dateEnd.date(),
    });
   
  }
  loadForms() {
      this.formGuarantee = this.fb.group({
        nombre_escenario: [null, Validators.required],
        tipo_garantia: [null, Validators.required ],
        observaciones: [null],
        fecha_inicio: [null],
        fecha_fin: [null],
    });

    //Setear form si estas editando 
    // if idScenario = condicion para ver si es editar o crear
    if (this.params && this.params.id) {
      this.title ='Editar Garantía';
      this.isEditing=true;
     this.setValueForm();
    } else if(this.params && this.params.scenario){
      console.log(this.dataChild,'dataChild')
      this.title ='Garantía';
      this.isEditing=true;
      if(this.dataChild){
        this.selectScenario(this.dataChild.id);
        this.formGuarantee.get('nombre_escenario').setValue(this.dataChild.nombre);
      }
    }
    else {
      this.configCumulative.visible = false;
      this.dataChild = false;
      this.title = 'Garantía';
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
      this.formGuarantee.get("nombre_escenario").valueChanges.subscribe((value) => {
        this.fetchScenarioOptions(value);
        this.title = value;
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
    let formValues= this.formGuarantee.value;
    formData.append("nombre_escenario", this.idScenario);
    formData.append("tipo_garantia", formValues.tipo_garantia);
    console.log(formValues.fecha_inicio)
    console.log(formValues.fecha_fin)
    console.log(formValues.observaciones)
    if(formValues.observaciones) formData.append("observaciones", formValues.observaciones);
    if(formValues.fecha_inicio) formData.append("fecha_inicio", this.getDateFormat(formValues.fecha_inicio));
    if(formValues.fecha_fin)  formData.append("fecha_fin", this.getDateFormat(formValues.fecha_fin));

    return formData;
  }

  save() {
    this.formGuarantee.markAllAsTouched();
 

    if (!this.formGuarantee.valid) return;
    if(this.idGuarantee){
      this.isLoadingSave = true;
      this.params = this.idGuarantee;
      return this.updateGuarantee();
    }
    if (!this.params.id) {
      console.log('create form')
      const guarantee = this.buildBody();
      this.createGuarante(guarantee);

    } else {
      this.isLoadingSave = true;
      this.updateGuarantee();
    }


  }
  selectScenario(id){
    this.idScenario = id;
  }
  updateGuarantee(){
    if(this.formGuarantee.value.fecha_inicio) this.formGuarantee.value.fecha_inicio = this.getDateFormat(this.formGuarantee.value.fecha_inicio);
    if(this.formGuarantee.value.fecha_fin) this.formGuarantee.value.fecha_fin = this.getDateFormat(this.formGuarantee.value.fecha_fin);
    this.formGuarantee.value.nombre_escenario= this.idScenario;
    this._guarantee.updateGuarantee(this.formGuarantee.value,this.params).subscribe(
      (resp: any) => {
        console.log("guarantee edite ", resp);
        this._notifier.showNotification("", "success");
        this.isLoadingSave = false;
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification(err, "error");
        this.isLoadingSave = false;
      }
    );
  }
  createGuarante(guarantee){
    this.isLoadingSave = true;
    this._guarantee.createGuarantee(guarantee).subscribe(
      (resp: any) => {
        console.log("guarantee created ", resp);
        this.idGuarantee = resp.data.id;
        this._notifier.showNotification("", "success");
        this.configCumulative.edit = true;
        this.configCumulative.delete = true;
        this.isLoadingSave = false;
        this.toggleCollapse();
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
          return this._guarantee.deleteGuarantee(this.idGuarantee);
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
    const control = this.formGuarantee.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  eventCollapse(event){
    console.log(event)
    this.isCollapsed = event.isCollapsed;
    this.isEditing = event.isEditing;
    this.isDetail = event.isDetail;
  }
}
