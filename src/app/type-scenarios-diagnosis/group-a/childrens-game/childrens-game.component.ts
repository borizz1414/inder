import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import  {piscina} from '../../group-b/pool/optionsPool';
@Component({
  selector: 'app-childrens-game',
  templateUrl: './childrens-game.component.html',
  styleUrls: ['./childrens-game.component.scss']
})
export class ChildrensGameComponent implements OnInit {
  formGroup:FormGroup
  piscina = piscina;
  
  constructor(private fb : FormBuilder) { }


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.fb.group({
      riesgo_estructural:this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion_general: [],
        riesgo_estructural_child:this.fb.group({
          calificacion:[],
          riesgo_estructural:[],
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
      acabado_superficie:this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        pisos:this.fb.group({
          calificacion:[],
          observaciones: this.fb.group({})
        })
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
        })
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
            // quemada: [false],
            // poste_volcado: [false],
            // quebrada: [false],
            // falta: [false],
            // desprendida: [false],
            // tapada_vegetacion: [false],
            // cables_desprendidos: [false],
          }),
        })
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
      mobiliario_deportivo:this.fb.group({
        importancia_relativa_grupos: [],
        calificacion: [],
        variable_auxiliar: [],
      }),
      mobiliario_juegos_infantiles:this.fb.group({
        muelle:this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        balancin:this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        columpio:this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        deslizadero:this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        puente_colgante:this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          cantidad: [],
          observaciones: this.fb.group({}),
        }),
        tubo_bomberos:this.fb.group({
          importancia_relativa_grupos: [],
          calificacion: [],
          cantidad: [],
          observaciones: this.fb.group({}),
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
    })
  }
  save(){
    console.log(this.formGroup.value)
  }
}
