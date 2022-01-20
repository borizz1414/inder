import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { piscina } from "../../group-b/pool/optionsPool";

@Component({
  selector: "app-gym",
  templateUrl: "./gym.component.html",
  styleUrls: ["./gym.component.scss"],
})
export class GymComponent implements OnInit {
  //TYPE SCENARIOS
  //  opt = Options

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log("tipo escenario infraestructura: ", this.typeSceario);

    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      riesgo_estructural: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
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
      superficie_deportiva: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        material: this.fb.group({
          area_m2: [],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
      }),
      equipo_deportivo: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        equipo_deportivo: this.fb.group({
          cantidad: [],
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        mobilidad_reducida: this.fb.group({
          cantidad: [],
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        street_workout: this.fb.group({
          cantidad: [],
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
      }),
      equipo_deportivo_cps: this.fb.group({
        mobilidad_reducida: this.fb.group({
          cantidad: [],
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
      }),
      areas_complementarias: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        oficina: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2: [],
          observaciones: this.fb.group({}),
        }),
        bodega: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2: [],
          observaciones: this.fb.group({}),
        }),
        baterias_sanitarias: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2: [],
          observaciones: this.fb.group({}),
        }),
        baño: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2: [],
          observaciones: this.fb.group({}),
        }),
        camerinos: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2: [],
          observaciones: this.fb.group({}),
        }),
        cuarto_aseo: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2: [],
          observaciones: this.fb.group({}),
        }),
        jardineras: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2: [],
          observaciones: this.fb.group({}),
        }),
      }),
      sistemas_hidrosanitarios: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        sanitario: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        duchas_internas: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        lavamanos: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        orinal: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        lava_escobas: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        pozuelo_lavaplatos: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
      }),
      sistemas_electricos: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        luminaria_interna: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        luminaria_externa: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        lamparas_emergencia: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        sensor: this.fb.group({
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        toma_electrico: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        switche: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        plafon_base_luminaria: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        tablero_breakers: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        camara_seguridad: this.fb.group({
          camaras: [""],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        aire_acondicionado: this.fb.group({
          aire: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        split: this.fb.group({
          split: [],
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
      }),
      elementos_drenaje: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        rejilla_piso: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
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
      }),
      cerrajeria: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        ventana: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        puerta_interna: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        cerradura: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        pasamanos: this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          area_m2: [],
          altura: [],
          longitud: [],
        }),
      }),
      cubiertas: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        estructura_metalica: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        cielos: this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        lucernarios: this.fb.group({
          cantidad: [],
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        bajante: this.fb.group({
          observaciones: this.fb.group({}),
        }),
      }),
      urbanistico: this.fb.group({
        si_no: [],
        observaciones: this.fb.group({}),
      }),
      arquitectonico: this.fb.group({
        si_no: [],
        observaciones: this.fb.group({}),
      }),
      estructural: this.fb.group({
        si_no: [],
        observaciones: this.fb.group({}),
      }),
      electrico: this.fb.group({
        si_no: [],
        observaciones: this.fb.group({}),
      }),
      hidrosanitario: this.fb.group({
        si_no: [],
        observaciones: this.fb.group({}),
      }),
      alcantarillado: this.fb.group({
        si_no: [],
        observaciones: this.fb.group({}),
      }),
      alumbrado_publico: this.fb.group({
        si_no: [],
        observaciones: this.fb.group({}),
      }), 
      manual_mantenimiento: this.fb.group({
        si_no: [],
        observaciones: this.fb.group({}),
      }),
      elaboracion: this.fb.group({
        nombre_profesional_tecnico: [],
        nombre_delineante: this.fb.group({}),
      }),
      revision: this.fb.group({
        nombre_coordinador: [],
      }),
    });
  }
  save(){
    console.log(this.formGroup.value)
  }
}
