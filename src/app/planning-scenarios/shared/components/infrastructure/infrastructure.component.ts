import {COMMA, ENTER} from '@angular/cdk/keycodes';


import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {
  Component,
  OnInit,
  Input,
  ElementRef, 
  ViewChild
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-infrastructure",
  templateUrl: "./infrastructure.component.html",
  styleUrls: ["./infrastructure.component.scss"],
})
export class InfrastructureComponent implements OnInit {
  formGroup: FormGroup

  
  @Input() typeScenario; 
  
 constructor(private fb: FormBuilder){

 }


 ngOnInit(){
   console.log(this.typeScenario, 'typeSceario')
  this.formGroup = this.fb.group({
    calificacion_ponderada:[''],
    variable_auxiliar:['']
  })
 }
 save(){

 }
}
