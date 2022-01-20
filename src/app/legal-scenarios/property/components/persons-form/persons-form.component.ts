import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CustomValidators } from "src/app/utils/validators";

@Component({
  selector: "app-persons-form",
  templateUrl: "./persons-form.component.html",
  styleUrls: ["./persons-form.component.scss"],
})
export class PersonsFormComponent implements OnInit {
  formGroup: FormGroup;
  persons = [];
  idEditPerson = false;
  documentFile = null;
  documentFileName: string = "";
  isEditing: boolean = false;
  indexEdit: number;

  @Input() config;
  @Input() childPersons;
  @Input() typeIdOptions;
  @Output() savePersons: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadForm();
    this.changeValidations();
    if (this.childPersons.length > 0) this.setEditUser();
    console.log(this.typeIdOptions, 'typeIdOptions');
    console.log(this.childPersons, "chilpersons");
  }

  setEditUser(){
    this.persons = this.childPersons
    this.save()
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_completo: ["", [Validators.required, CustomValidators.maximumLength]],
      tipo_identificacion_id: ["", Validators.required],
      numero_identificacion: ["", [Validators.required, CustomValidators.isIdValid]],
      telefono: ["", CustomValidators.isIdValid],
      direccion: ["", CustomValidators.maximumLength],
      email: ["", Validators.email],
    });
  }

  changeValidations() {
    const telefono = this.formGroup.get("telefono");
    const direccion = this.formGroup.get("direccion");
    const email = this.formGroup.get("email");

    if (this.config.name === "Comodatario") {
      telefono.setValidators([Validators.required, CustomValidators.isIdValid]);
      direccion.setValidators([
        Validators.required,
        CustomValidators.maximumLength,
      ]);
    }

    if (this.config.name === "Supervisor") {
      telefono.setValidators(null);
      direccion.setValidators(null);
      email.setValidators(null);
    }

    telefono.updateValueAndValidity();
    direccion.updateValueAndValidity();
    email.updateValueAndValidity();
  }

  save() {
    //console.log('this.formGroup.valid', this.formGroup.valid)
    //console.log('this.formGroup', this.formGroup)
    if (this.formGroup.valid) {
      let newPerson = {
        ...this.formGroup.value,
        documentFile: this.documentFile,
      };
      if(this.idEditPerson) newPerson = {...newPerson,id:this.idEditPerson};
      if (this.isEditing) {
        this.persons.splice(this.indexEdit, 1, newPerson);
        this.isEditing = false;
      } else {
        this.persons.push(newPerson);
      }
      //console.log('persons',this.persons)
      this.savePersons.emit(this.persons);
      this.loadForm();
      this.changeValidations();
      this.documentFile = null;
      this.documentFileName = "";
    }
  }

  onChangeFile(event: any) {
    const file = event.target.files[0];

    this.documentFile = file;
    this.documentFileName = file.name;
  }

  delete(index: number) {
    if (index === 0 && this.persons.length === 1) {
      this.persons = [];
    } else {
      this.persons.splice(index, 1);
    }

    this.savePersons.emit(this.persons);
  }

  edit(person, index: number) {
    console.log(person)
    
    if(person.id) this.idEditPerson = person.id;
    this.formGroup.patchValue(person);
    this.isEditing = true;
    this.indexEdit = index;
    this.documentFile = person.documentFile;
    this.documentFileName = person.documentFile?.name || "";
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
