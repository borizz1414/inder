import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-type-reservations',
  templateUrl: './type-reservations.component.html',
  styleUrls: ['./type-reservations.component.scss']
})
export class TypeReservationsComponent implements OnInit {

  formGroup: FormGroup;
  typeReservations = [];
  typeReserOptions = [];
  isEditing: boolean = false;
  indexEdit: number;
  idEdit: number;

  @Input() config; // Configuración para título y tabla
  @Input() children; // Data de la tabla
  @Input() typeReservationsOptions; // Opciones de los selects
  @Output() sendSave: EventEmitter<any> = new EventEmitter(); // Se emite cuando se guarda un registro y lo envía al padre para que este lo almacene

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('typeReservationsOptions in reservations form', this.typeReservationsOptions);
    console.log('children in reservations form', this.children)

    this.typeReserOptions = this.typeReservationsOptions
    this.loadForm();
    if (this.children.length) this.setEdit();
  }

  setEdit(){
    this.typeReservations = this.children
    console.log('typeReservations after set children', this.typeReservations)
  }

  loadForm() {
    this.formGroup = this.fb.group({
      tipo_reserva: [""],
      bloque_tiempo: [""],
      bloque_minimo_reserva: [""],
      bloque_maximo_reserva: [""],
      dias_previos: [''],
      cantidad_minima_usuarios: [''],
      cantidad_maxima_usuarios: ['']
    });
  }

  save() {
    if (this.formGroup.valid) {
      let newElement: any = this.formGroup.value;

      if(!newElement?.id && this.idEdit){
        newElement = { ...newElement, id: this.idEdit }
      }

      if (this.isEditing) {
        this.typeReservations.splice(this.indexEdit, 1, newElement);
        this.isEditing = false;
      } else {
        this.typeReservations.push(newElement);
      }

      this.sendSave.emit(this.typeReservations);
      this.loadForm();
    }
  }

  delete(index: number) {
    if (index === 0 && this.typeReservations.length === 1) {
      this.typeReservations = [];
    } else {
      this.typeReservations.splice(index, 1);
    }

    this.sendSave.emit(this.typeReservations);
  }

  edit(item, index: number) {
    if(item.id) this.idEdit = item.id
    this.formGroup.patchValue(item);
    this.isEditing = true;
    this.indexEdit = index;
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

}
