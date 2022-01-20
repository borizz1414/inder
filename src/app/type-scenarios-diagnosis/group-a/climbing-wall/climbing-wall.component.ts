import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { piscina } from "../../group-b/pool/optionsPool";
import { muro_escalar } from "./options";
import { MatChipInputEvent } from "@angular/material/chips";
import { ClimbingWallService } from "./climbing-wall.service";
@Component({
  selector: "app-climbing-wall",
  templateUrl: "./climbing-wall.component.html",
  styleUrls: ["./climbing-wall.component.scss"],
})
export class ClimbingWallComponent implements OnInit {
  formGroup: FormGroup;
  piscina = piscina;
  opt = muro_escalar;
  selectable = true;
  removable = true;

  // VARIABLES PARA AUTOCOMPLETABLES OPCIONES optionsA = opcionesAutocomplete
  optionsA1 = this.opt.area_juego.superficie_deportiva.obs1;
  optionsA2 = this.opt.areas_complementarias.otros.obs1;
  optionsA3 = this.opt.areas_complementarias.otros.mat1[0];
  // optionsA4= this.opt.areas_complementarias.otros.mat1[1]
  optionsA5 = this.opt.areas_complementarias.otros.mat1[2];
  optionsA6 = this.opt.areas_complementarias.otros.mat1[3];
  optionsA7 = this.opt.areas_complementarias.otros.mat1[4];
  // optionsA8= this.opt.areas_complementarias.otros.mat1[5]
  optionsA9 = this.opt.areas_complementarias.otros.mat1[6];
  optionsA10 = this.opt.areas_complementarias.otros.mat1[7];
  optionsA11 = this.opt.areas_complementarias.otros.mat1[8];
  optionsA12 = this.opt.areas_complementarias.otros.mat2;

  autoCompletables = [[], [], [], [], [], [], [], [], [], [], [],[],[],[]];
  obs1 = this._wall.obs1;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private fb: FormBuilder, private _wall: ClimbingWallService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.fb.group({
      riesgo_estructural: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion_general: [],
        riesgo_estructural_child: this.fb.group({
          riesgo_estructural: [],
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
        }),
      }),
      acabado_superficie: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion_general: [],
      }),
      area_juego: this.fb.group({
        superficie_deportiva: this.fb.group({
          calificacion: [],
          observaciones: [],
        }),
      }),
      areas_complementarias: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion_general: [],
        variable_auxiliar: [],
        otros: this.fb.group({
          area_m2: [],
          importancia_relativa_grupos: [""],
          calificacion_general: [],
          observaciones: [],
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
        estructura_tuberia_pesada: this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          area_m2: [],
          observaciones: this.fb.group({}),
        }),
      }),
      elementos_drenaje: this.fb.group({
        importancia_relativa_grupos: [],
        calificacion: [],
        variable_auxiliar: [],
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
      mobiliario_deportivo: this.fb.group({
        importancia_relativa_grupos: [],
        calificacion: [],
        variable_auxiliar: [],
        muro: this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          area_m2: [],
          observaciones: this.fb.group({}),
        }),
        agarres:this.fb.group({
          cantidad: [],
          importancia_relativa_grupos: [],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        anclaje_seguridad:this.fb.group({
          cantidad: [],
          importancia_relativa_grupos: [],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        colchoneta:this.fb.group({
          cantidad: [],
          importancia_relativa_grupos: [],
          calificacion: [],
          observaciones: this.fb.group({}),
        })
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
          observaciones: this.fb.group({}),
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
  checkboxEvent(obj, arr: any, valueElement) {
    console.log(arr);
    let val = valueElement;
    let array = arr;
    // a.push(value);
    for (let [key, value] of Object.entries(this[obj])) {
      console.log(key, value);
      let itemValue = [];
      itemValue.push(val);
      value = itemValue;
      if (array == key) {
        console.log(key, "key si");
      
      }
    }
  }
  checkbox(val) {
    console.log(val, "checkbox");
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      // this.pisArrAreJuePla.push(value);
      console.log(event);
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

  selected(event, autoComplete, array): void {
    let i = autoComplete - 1;

    this.autoCompletables[i].push(event.option.viewValue);
    console.log(event.option.viewValue, "auto1 Value");
    this[array] = this[array].filter(
      (element) => element != event.option.viewValue
    );
  }
  save() {
    console.log(this._wall.obs1);
    const form = this.formGroup.value;
    form.area_juego.superficie_deportiva.observaciones = this._wall.obs1;
    console.log(form);
  }
}
