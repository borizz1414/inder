import { Component, OnInit, ViewChild, Input, ElementRef } from "@angular/core";
import {
  FormArray,
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { piscina } from "./optionsPool";
import { PoolService } from './pool.service';
@Component({
  selector: "app-pool",
  templateUrl: "./pool.component.html",
  styleUrls: ["./pool.component.scss"],
})
export class PoolComponent implements OnInit {
  //TYPE SCENARIOS
  //  opt = Options

  piscina = piscina;

  //// CHIPS AUTOCOMPLETE
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  // 3 firts letter



  formPool: FormGroup;
  dynamicForms;
  expandFilterValue = true;
  qualificationsSections = [];
  @ViewChild("fruitInput") fruitInput: ElementRef<HTMLInputElement>;
  // @ViewChild('areComOfi') areComOfi: ElementRef<HTMLInputElement>;
  ////
  @Input() typeSceario;
  //@Output() saveInfo: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private _pool : PoolService) {

  
  }

  ngOnInit(): void {
    console.log("tipo escenario infraestructura: ", this.typeSceario);

    this.loadForm();
  }
  expandFilters() {
    this.expandFilterValue = !this.expandFilterValue;
  }
  loadForm() {
    this.formPool = this.fb.group({
      piscina: this.fb.group({
        riesgo_estructural: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion_general: [],
          observaciones: this.fb.group({
            asentamientos: [false],
            desplazamiento_de_talud: [false],
            muros_volcados: [false],
            separacion_estructurales_juntas_placas: [false],
            grietas_pronunciadas_muros_contencion: [false],
            grietas_pronunciadas_areas_complementarias: [false],
            falla_estructura_superficie_juego: [false],
            socavaciones: [false],
          }),
        }),
        area_juego_elementos_escenario: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion_general: [""],
          variable_auxiliar: [],
        }),
        area_juego: this.fb.group({
          vaso: this.fb.group({
            area_m2: [""],
            calificacion: [""],
            importancia_relativa: [""],
            observaciones: this.fb.group({
              asentamientos: [false],
              desgaste_superficie: [false],
              fisuras: [false],
              grietas: [false],
              huecos: [false],
              nombre_sintetico_despegado: [false],
              filtraciones: [false],
            }),
          }),
          playa: this.fb.group({
            area_m2: [""],
            calificacion: [""],
            importancia_relativa: [""],
            observaciones: this.fb.array([])
          }),
        }),
      }),
    });
  }

   get obsAuto1(): FormArray {
    return this.formPool.get(['piscina','area_juego','playa','observaciones']) as FormArray;
  }
  save() {
    console.log(this.formPool.value);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formPool.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      // this.pisArrAreJuePla.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();

    // this.pisAreJuePlaCtrl.setValue(null);
  }

  remove(fruit: string): void {
    // const index = this.pisArrAreJuePla.indexOf(fruit);

    // if (index >= 0) {
      // this.pisArrAreJuePla.splice(index, 1);
    // }
  }

  selected(value, autoComplete): void {
    // this.pisArrAreJuePla.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = "";
    // this.pisAreJuePlaCtrl.setValue(null);

    if (autoComplete == 1) {
      // console.log(this.getField('piscina.area_juego.playa.observaciones'))
      // FILTER OBS
      piscina.area_juego.playa.observaciones =
        piscina.area_juego.playa.observaciones.filter(
          (element) => element != value
        );
        // console.log(piscina.area_juego.playa.observaciones2[index],'piscina.area_juego.playa.observaciones2[index]')

          console.log(this.obsAuto1,'obsAuto1')
      this.obsAuto1.push(this._pool.autoComplete1(value));
      // console.log(this._pool.autoComplete1(value) ,'autoComplete1 service')
 
    }
    console.log(this.formPool);
    // console.log(value,' value')
    console.log(
      this.formPool.value.piscina.area_juego.playa.observaciones,
      "obs"
    );
    console.log(event);
    // this.formPool.value.area_juego.playa.observaciones_array.push(this.fb.group({
    //   material:[]
    // }))
  }

  // private _filter(value: string): string[] {
    // const filterValue = value.toLowerCase();

    // return this.pisMatAreJuePla.filter((fruit) =>
    //   fruit.toLowerCase().includes(filterValue)
    // );
  // }

  onChange(email: string, isChecked: boolean) {
    const emailFormArray = <FormArray>this.formPool.controls.usermail;

    if (isChecked) {
      emailFormArray.push(new FormControl(email));
    } else {
      let index = emailFormArray.controls.findIndex((x) => x.value == email);
      emailFormArray.removeAt(index);
    }
  }
}
