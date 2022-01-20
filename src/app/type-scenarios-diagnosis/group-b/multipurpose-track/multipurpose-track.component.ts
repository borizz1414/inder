import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { piscina } from '../pool/optionsPool';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PoolService } from '../pool/pool.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { pista_multiproposito } from './options';

@Component({
  selector: 'app-multipurpose-track',
  templateUrl: './multipurpose-track.component.html',
  styleUrls: ['./multipurpose-track.component.scss']
})
export class MultipurposeTrackComponent implements OnInit {

   //TYPE SCENARIOS
  //  opt = Options
  opt = pista_multiproposito;
  piscina = piscina;

  //// CHIPS AUTOCOMPLETE
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  // 3 firts letter



  formGroup: FormGroup;
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
    this.formGroup = this.fb.group({
        riesgo_estructural: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion_general: [],
          riesgo_estructural_child:this.fb.group({
            riesgo_estructural:[],
            calificacion: [],
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
          })
        }),
        superficie_juego: this.fb.group({
          importancia_relativa_grupos: [""],

        }),
        acabado_superficie: this.fb.group({
          pisos: this.fb.group({
            calificacion: [""],
            observaciones: this.fb.group({
            }),
          }),
        }),
        areas_complementarias:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          otros:this.fb.group({
            importancia_relativa_grupos: [""],
            calificacion: [],
            area_m2:[],
            observaciones:this.fb.group({})
          }),
          jardineras:this.fb.group({
            importancia_relativa_grupos: [""],
            calificacion: [],
            area_m2:[],
            observaciones:this.fb.group({
              // quebrada:[],
              // deteriorada:[],
              // enmalezada:[],
              // sin_plantas:[],
              // con_escombros:[]
  
            })
          }),
          graderias:this.fb.group({
            importancia_relativa_grupos: [""],
            calificacion: [],
            area_m2:[],
            observaciones:this.fb.group({
              // quebrada:[],
              // deteriorada:[],
              // enmalezada:[],
              // sin_plantas:[],
              // con_escombros:[]
  
            })
          })
        }),
        elementos_drenaje: this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          variable_auxiliar: [],
          rejilla_piso:this.fb.group({
            importancia_relativa_grupos: [],
            calificacion: [],
            cantidad: [],
            observaciones: this.fb.group({}),
          }),
          cuneta: this.fb.group({
            longitud: [],
            importancia_relativa_grupos: [],
            calificacion: [],
            observaciones: this.fb.group({}),
          }),
          carcamo: this.fb.group({
            longitud: [],
            importancia_relativa_grupos: [],
            calificacion: [],
            observaciones: this.fb.group({}),
          }),
          sumidero: this.fb.group({
            cantidad: [],
            observaciones: this.fb.group({}),
          }),
          caja_inspeccion_hidraulica: this.fb.group({
            cantidad: [],
            observaciones: this.fb.group({}),
          }),
        }),
        cerramientos: this.fb.group({
          importancia_relativa_grupos: [],
          calificacion_general: [],
          variable_auxiliar: [],
          muros_contencion: this.fb.group({
            importancia_relativa_grupos: [],
            calificacion: [],
            longitud: [],
            altura: [],
            observaciones: this.fb.group({}),
          }),
          malla_eslabonada: this.fb.group({
            importancia_relativa_grupos: [],
            calificacion: [],
            area_m2: [],
            altura: [],
            longitud: [],
            observaciones: this.fb.group({}),
          }),
          lamina_perforada: this.fb.group({
            altura: [],
            longitud: [],
          }),
          estructura_pts: this.fb.group({
            calificacion: [],
            area_m2: [],
            importancia_relativa_grupos: [],
            observaciones: this.fb.group({
              // oxidada:[],
              // corroida:[],
              // faltan_vientos:[],
              // reventado:[],
              // volcada:[],
              // faltan_piezas:[]
  
            }),
          }),
          estructura_tuberia_pesada: this.fb.group({
            importancia_relativa_grupos: [],
            calificacion: [],
            area_m2: [],
            observaciones: this.fb.group({
              // oxidada:[],
              // corroida:[],
              // despintada:[],
              // reventado:[],
              // volcada:[],
              // faltan_piezas:[]
            }),
          }),
        }),
        sistemas_electricos: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion_general: [],
          variable_auxiliar: [],
          luminaria_interna: this.fb.group({
            cantidad: [""],
            calificacion: [],
            importancia_relativa_grupos: [],
            observaciones: this.fb.group({
              quemada: [false],
              poste_volcado: [false],
              quebrada: [false],
              falta: [false],
              desprendida: [false],
              tapada_vegetacion: [false],
              cables_desprendidos: [false],
            }),
          }),
        }),
        cerrajeria:this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          variable_auxiliar: [],
          pasamanos:this.fb.group({
            importancia_relativa_grupos: [],
            calificacion: [],
            area_m2: [],
            altura: [],
            longitud: [],
          })
        }),
      
        urbanistico:this.fb.group({
          si_no:[],
          observaciones: this.fb.group({}),
        }),
        arquitectonico:this.fb.group({
          si_no:[],
          observaciones: this.fb.group({}),
        }),
        estructural:this.fb.group({
          si_no:[],
          observaciones: this.fb.group({}),
        }),
        electrico:this.fb.group({
          si_no:[],
          observaciones: this.fb.group({}),
        }),
        hidrosanitario:this.fb.group({
          si_no:[],
          observaciones: this.fb.group({}),
        }),
        alcantarillado:this.fb.group({
          si_no:[],
          observaciones: this.fb.group({}),
        }),
        alumbrado_publico:this.fb.group({
          si_no:[],
          observaciones: this.fb.group({}),
        }),
        manual_mantenimiento:this.fb.group({
          si_no:[],
          observaciones: this.fb.group({}),
        }),
        elaboracion:this.fb.group({
          nombre_profesional_tecnico:[],
          nombre_delineante: this.fb.group({}),
        }),
        revision:this.fb.group({
          nombre_coordinador:[],
        }),
    });
  }

   get obsAuto1(): FormArray {
    return this.formGroup.get(['piscina','area_juego','playa','observaciones']) as FormArray;
  }
  save() {
    console.log(this.formGroup.value);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
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
    console.log(this.formGroup);
    // console.log(value,' value')
    console.log(
      this.formGroup.value.piscina.area_juego.playa.observaciones,
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
    const emailFormArray = <FormArray>this.formGroup.controls.usermail;

    if (isChecked) {
      emailFormArray.push(new FormControl(email));
    } else {
      let index = emailFormArray.controls.findIndex((x) => x.value == email);
      emailFormArray.removeAt(index);
    }
  }
 

}
