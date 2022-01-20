import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CustomValidators } from "src/app/utils/validators";

@Component({
  selector: 'app-interventions-form',
  templateUrl: './interventions-form.component.html',
  styleUrls: ['./interventions-form.component.scss']
})
export class InterventionsFormComponent implements OnInit {

  formGroup: FormGroup;
  interventions = [];
  isEditing: boolean = false;
  indexEdit: number;
  idElementEdit: number = null;
  years = [];

  @Input() config;
  @Input() children;
  @Output() sendSave: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadForm();
    this.generateYears(1850)
    
    if(this.children.length){
      this.setEdit();
    } 
  }

  generateYears(finalYear){
    let currentYear = new Date().getFullYear();
  
    while (currentYear >= finalYear) {
      this.years.push(currentYear);
      currentYear--;
    }  
  }

  setEdit(){
    this.interventions = this.children
    this.save()
  }

  loadForm() {
    this.formGroup = this.fb.group({
      anio: [""],
      contratista: ["", Validators.required],
      numero_contrato: ["", Validators.required],
      descripcion: [""],
    });
  }

  save() {
    if (this.formGroup.valid) {
      let newElement = this.formGroup.value;
      if(this.idElementEdit !== null){
        newElement = {
          ...newElement,
          id: this.idElementEdit
        }
      } 

      if (this.isEditing) {
        this.interventions.splice(this.indexEdit, 1, newElement);
        this.isEditing = false;
      } else {
        this.interventions.push(newElement);
      }
      console.log('interventions',this.interventions)
      this.sendSave.emit(this.interventions);
      this.loadForm();
    }
  }

  delete(index: number) {
    if (index === 0 && this.interventions.length === 1) {
      this.interventions = [];
    } else {
      this.interventions.splice(index, 1);
    }

    this.sendSave.emit(this.interventions);
  }

  edit(item, index: number) {
    this.formGroup.patchValue(item);
    this.isEditing = true;
    this.indexEdit = index;
    if(item?.id){
      this.idElementEdit = item.id
    }
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
