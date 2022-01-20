import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoolService } from '../pool/pool.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { piscina } from '../pool/optionsPool';

@Component({
  selector: 'app-ludoteka',
  templateUrl: './ludoteka.component.html',
  styleUrls: ['./ludoteka.component.scss']
})
export class LudotekaComponent implements OnInit {

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

  constructor(private fb: FormBuilder,
              private _pool : PoolService) {

  
  }

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
      area_juego: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: []
      }),
      areas_complementarias: this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        jardineras:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        parqueaderos:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2:[],
        }),
        vigilancia:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        oficina:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        bodega:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        cuarto_util:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        cuarto_aseo:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        salon:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        gym_infantil:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        sala_roles:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        sala_talleres:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        sala_lectura:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        baño:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        baterias_sanitarias:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        cocineta:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
        patio:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          cantidad: [],
          area_m2:[],
          observaciones: this.fb.group({}),
        }),
      }),
      cubiertas:this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        losa:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        estructura_metalica:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        cielos:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        }),
        lucernarios:this.fb.group({
          cantidad:[],
          importancia_relativa_grupos: [""],
          calificacion: [],
          observaciones: this.fb.group({}),
        })
      }),
      sistemas_hidrosanitarios:this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        sanitario:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        sanitario_infantiles:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        duchas_internas:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        lavamanos:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        lavamanos_infantiles:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        orinal:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        orinal_infantiles:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        lava_escobas:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        pozuelo_lavaplatos:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
      }),
      sistemas_electricos:this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        luminaria_interna:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        luminaria_externa:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        lamparas_emergencia:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        toma_electrico:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        switche:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        plafon_base_luminaria:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        tablero_breakers:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        camara_seguridad:this.fb.group({
          camaras: [""],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        sensor:this.fb.group({
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        aire_acondicionado:this.fb.group({
          aire:[],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        split:this.fb.group({
          split:[],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        lavador_aire:this.fb.group({
          lavador:[],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
      }),
      elementos_drenaje:this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        rejilla_piso:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
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
      cerrajeria:this.fb.group({
        importancia_relativa_grupos: [""],
        calificacion: [],
        variable_auxiliar: [],
        ventana:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        puerta_interna:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        cerradura:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        rejas:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
        candado:this.fb.group({
          importancia_relativa_grupos: [""],
          calificacion: [],
          variable_auxiliar: [],
          cantidad:[],
          observaciones: this.fb.group({}),
        }),
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
