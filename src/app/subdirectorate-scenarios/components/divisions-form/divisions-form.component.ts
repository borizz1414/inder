import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { DeleteModalComponent } from "src/app/shared/components/delete-modal/delete-modal.component";
@Component({
  selector: 'app-divisions-form',
  templateUrl: './divisions-form.component.html',
  styleUrls: ['./divisions-form.component.scss']
})
export class DivisionsFormComponent implements OnInit {

  formGroup: FormGroup;
  id: string = '';
  isLoadingSave: boolean = false;
  tendenciasOptions: any[] = []
  divisionCategoryOptions: any[] = []
  typeReservationsOptions: any[] = []
  disciplinesSelected: any = []

  // Variables para el horario
  hora_recepcion = null;
  hora_recepcion2 = null;
  horarios = [
    {
      nombre_dia: 'lunes',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'martes',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'miercoles',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'jueves',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'viernes',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'sabado',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'domingo',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    }
  ]
  meridian = true;
  noMeridian = false;
  spinners = false;

  // Configuración del modal de eliminar
  configDeleteModal = {
    title: "¿Seguro de Eliminar esta División?",
    bodyText: "",
  };

  //Variables para el acumulative form
  title : string = 'División'
  isCollapsed: boolean = false;
  isEditing: boolean = false;
  isDetail: boolean = false;

  //Configuracion de los iconos se van a mostar view, edit y delete
  configCumulative = {
    visible:false,
    edit:false,
    delete:false
  }

  // Variables para el autocomplete de chips
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];  
  disciplina = new FormControl();
  filteredDisciplines: any[] = [];
  disciplines: any[] = [];
  allDisciplines: any[] = [];
  @ViewChild('disciplineInput') disciplineInput: ElementRef<HTMLInputElement>;

  //Variables para el componente de tipos de reservaciones
  configTypeReservation = {
    name: "Tipos de Reservas",
    columns: ["TIPO DE RESERVA", "BLOQUE DE TIEMPO", "DÍAS PREVIOS PARA LA RESERVA"],
  };
  typeReservations = [];

  @Input() idScenario: number; // Id del padre, condiciona si es crear o editar
  @Input() scenarioData: any; // Data del padre
  @Input() dataChild: any; // Data como hijo (Division data)
  @Input() indexDataChild: any; // Index en array de divisiones, es diferente que el id.
  @Input() selectOptions: any; // Opciones para los campos de selección, vienen desde padre para que no se hagan múltiples fetch, además está determinados en el paso 2.
  @Input() horariosData: any; // Mismo horario del paso 2 para las divisiones
  @Output() saveAsChild: EventEmitter<any> = new EventEmitter(); // Es emitido cuando se presiona Guardar División para ordenar al padre que se muestre el botón Agregra Otra División.
  @Output() formCollapsed: EventEmitter<any> = new EventEmitter(); // Maneja el abrir y cerrar el colapsable.
  @Output() showDetail: EventEmitter<any> = new EventEmitter(); // Para cambiar form a vista de detalle (en este caso nunca se usa).
  @Output() fetchDataChild: EventEmitter<any> = new EventEmitter(); // Cuando se presiona Guardar División se ordena al padre traer nuevamente la data.
  @Output() removeForm: EventEmitter<any> = new EventEmitter(); // Remueve el form hijo de la lista de divisiones en el padre.
  @Output() sendDivision: EventEmitter<any> = new EventEmitter(); // Envía la info de división al form padre cuando se presiona el botón Guardar División

  constructor(
    private fb: FormBuilder, 
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    console.log('idScenario en form division', this.idScenario);
    console.log('scenarioData en form division', this.scenarioData);
    console.log('dataChild en form division', this.dataChild);
    console.log('indexDataChild in form division', this.indexDataChild);  
    console.log('selectOptions in form division', this.selectOptions);

    this.allDisciplines = this.selectOptions.disciplinesOptions;
    this.filteredDisciplines = this.selectOptions.disciplinesOptions;
    this.tendenciasOptions = this.selectOptions.tendenciasOptions;
    this.divisionCategoryOptions = this.selectOptions.divisionCategoryOptions;
    this.typeReservationsOptions = this.selectOptions.typeReservationsOptions;

    if(this.horariosData){
      this.horarios = [...this.horariosData]
    }

    this.loadForm();
  }
  
  loadForm() {
    this.formGroup = this.fb.group({
      categoria_division: [''],
      division: [''],
      tendencias: [''],
      edad_minima: [''],
      aprobacion_reserva: ['false']
    });

    // Set value form if Edit
    // if idScenario = condicion para ver si es editar o crear
    if (this.idScenario && this.dataChild.id) {
      this.setValueFormBack() // Es editar del escenario y editar de la división

      // this.isCollapsed = true;
      // this.configCumulative.delete = true;
      // this.configCumulative.edit = true;

    // Para enviar los valores que se están recibiendo al padre de manera 
    // que se tengan en ambos lados las divisiones con los mismos nombres de variables
    this.save()

    } else {
      if(this.dataChild.id === null){ // Es crear del escenario y editar de la división
        this.setValueFormFront()
        
        this.isCollapsed = true;
        this.configCumulative.delete = true;
        this.configCumulative.edit = true;

      } else{ // Es crear del escenario y crear de la división
        this.dataChild = false;
        this.isEditing = true;
      }
    }
  }

  setValueFormFront() {
    console.log('entrando front');
    
    this.formGroup.get("categoria_division").setValue(this.dataChild.categoria_division)
    this.formGroup.get("division").setValue(this.dataChild.division)
    this.formGroup.get("edad_minima").setValue(this.dataChild.edad_minima)
    this.formGroup.get("aprobacion_reserva").setValue(this.dataChild.aprobacion_reserva)

    if(!this.horariosData){
      this.horarios = [...this.dataChild.horarios]
    }

    if(this.dataChild.disciplinas.length){
      this.disciplinesSelected = [...this.dataChild.disciplinas]
      this.disciplines = this.disciplinesSelected.map(item => item.nombre)
    }

    if(this.dataChild.tendencias.length){
      this.formGroup.get("tendencias").setValue(this.dataChild.tendencias[0].nombre)
    }
    
    this.typeReservations = this.dataChild.tipoReservas
  }

  setValueFormBack(){
    console.log('entrando back');
    this.formGroup.get("categoria_division").setValue(this.dataChild?.categoria_division_id || '')
    this.formGroup.get("division").setValue(this.dataChild?.nombre || '')
    this.formGroup.get("edad_minima").setValue(this.dataChild?.edad_minima || '')
    this.formGroup.get("aprobacion_reserva").setValue((this.dataChild?.necesita_aprobacion ? 'true' : 'false') || '')

    if(!this.horariosData){
      this.horarios.forEach(element => {
        const timeInicialManana = this.dataChild[`hora_inicial_${element.nombre_dia}`]
        const timeFinalManana = this.dataChild[`hora_final_${element.nombre_dia}`]
        const timeInicialTarde = this.dataChild[`hora_inicial2_${element.nombre_dia}`]
        const timeFinalTarde = this.dataChild[`hora_final2_${element.nombre_dia}`]
  
        element.hora_inicial_manana = {
          hour: parseInt(timeInicialManana.slice(0, 2)),
          minute: parseInt(timeInicialManana.slice(3, 5)),
        };
  
        element.hora_final_manana = {
          hour: parseInt(timeFinalManana.slice(0, 2)),
          minute: parseInt(timeFinalManana.slice(3, 5)),
        };
  
        element.hora_inicial_tarde = {
          hour: parseInt(timeInicialTarde.slice(0, 2)) - 12,
          minute: parseInt(timeInicialTarde.slice(3, 5)),
        };
  
        element.hora_final_tarde = {
          hour: parseInt(timeFinalTarde.slice(0, 2)),
          minute: parseInt(timeFinalTarde.slice(3, 5)),
        };
      }); 
    }

    if(this.dataChild?.disciplinas_division.length){
      this.disciplinesSelected = [...this.dataChild.disciplinas_division]
      this.disciplines = this.disciplinesSelected.map(item => item.nombre)
    }

    if(this.dataChild.tendencias_division.length){
      this.formGroup.get("tendencias").setValue(this.dataChild.tendencias_division[0].nombre)
    }
    
    if(this.dataChild?.tipo_reserva_division.length){
      this.typeReservations = this.dataChild.tipo_reserva_division.map(item => ({
        id: item?.id || '',
        tipo_reserva: item?.tipo_Reserva?.id || '',
        bloque_tiempo: item?.bloque_tiempo || '',
        bloque_minimo_reserva: item?.tiempo_minimo || '',
        bloque_maximo_reserva: item?.tiempo_maximo || '',
        dias_previos: item?.dias_previos_reserva || '',
        cantidad_minima_usuarios: item?.usuarios_minimos || '',
        cantidad_maxima_usuarios: item?.usuarios_maximos || '',
      }))
    }
  }

  toggleCollapse() {  
    this.isCollapsed = !this.isCollapsed;
    this.formCollapsed.emit(this.isCollapsed);
  }

  buildDivisionData(){
    const formValues = this.formGroup.value
    let data : any = {};

    data = {
      ...formValues,
      index: this.indexDataChild,
      id: this.dataChild?.id || null,
      tipoReservas: this.typeReservations,
    }    
    
    if(this.disciplinesSelected.length){
      data = { ...data, disciplinas: [...this.disciplinesSelected] }
    }

    if(formValues.tendencias){
      const tendencia = this.tendenciasOptions.find(item => item.nombre === formValues.tendencias);
      data = { ...data, tendencias: [tendencia] }
    }

    data = { ...data, horarios: [...this.horarios] }

    return data;
  }

  save() {
    console.log('entrando a save division para enviar data de nuevo al padre');
    
    this.formGroup.markAllAsTouched();
    this.toggleCollapse();
    this.configCumulative.edit = true;
    this.configCumulative.delete = true;

    if (!this.formGroup.valid) {
      return;
    }
    const data = this.buildDivisionData()
    this.sendDivision.emit(data);
  }

  delete(value) {
    //console.log('value delete division', value);
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.config = this.configDeleteModal;

    modalRef.componentInstance.confirmDelete.subscribe((resp: any) => {
      modalRef.close();
      this.removeForm.emit(this.indexDataChild);
      //console.log('removiendo');
    });
  }

  eventCollapse(event){
    this.isCollapsed = event.isCollapsed;
    this.isEditing = event.isEditing;
    this.isDetail = event.isDetail;
    this.formCollapsed.emit(this.isCollapsed);
  }

  cancel(){
    this.removeForm.emit(this.indexDataChild);
    this.toggleCollapse();
    this.configCumulative.edit = true;
    this.configCumulative.delete = true;
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  saveTypeReservations(event){
    this.typeReservations = event;
    console.log('obteniendo tipos de reservas', this.typeReservations);
  }

  // Chips methods
  add(event: any, chipList: string, formControl: string ): void {
    const value = (event.value || '').trim();

    // Add our item
    if (value) {
      this[chipList].push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this[formControl].setValue(null);
  }

  remove(item: string, chipList: string): void {
    const index = this[chipList].indexOf(item);

    if (index >= 0) {
      this[chipList].splice(index, 1);
    }
  }

  selected(
    event: MatAutocompleteSelectedEvent, 
    chipList: string, 
    tag: string, 
    formControl: string
  ): void {
    this[chipList].push(event.option.viewValue);
    this[tag].nativeElement.value = '';
    this[formControl].setValue(null);
  }

  getOptionsSelected(option, listSelected, formControl){
    this[listSelected].push(option)   
    this[formControl].setValue('');
  }

  removeSelected(index, listSelected){
    this[listSelected].splice(index, 1)
  }
}
