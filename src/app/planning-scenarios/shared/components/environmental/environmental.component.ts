import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-environmental',
  templateUrl: './environmental.component.html',
  styleUrls: ['./environmental.component.scss']
})
export class EnvironmentalComponent implements OnInit {

  formGroup: FormGroup;
  qualificationsSections = []
  @Input() typeScenario;
  //@Output() saveInfo: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('tipo escenario ambiental: ',this.typeScenario);
    this.loadForm();
    this.createSections()
  }

  loadForm() {
    this.formGroup = this.fb.group({
      elementos_sostenibilidad:this.fb.group({
        senalizacion_imagen_institucional:this.fb.group({
          bool:[],
          cumplimiento:[],
          calificacion:[],
          observaciones:this.fb.group({
          })
        }),
        locales_comerciales:this.fb.group({
          bool:[],
          observaciones:this.fb.group({
          })
        })
      }),
      elementos_seguridad:this.fb.group({
        lineas_vida:this.fb.group({
          bool:[],
          necesidad:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        senalizacion_emergencia:this.fb.group({
          bool:[],
          necesidad:[],
          observaciones:this.fb.group({
          }),
          suficiente:[],
          calificacion:[],
        }),
        salida_emergencia:this.fb.group({
          bool:[],
          necesidad:[],
          observaciones:this.fb.group({
          }),
          suficiente:[],
          calificacion:[],
        }),
        punto_encuentro:this.fb.group({
          bool:[],
          necesidad:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        botiquin:this.fb.group({
          bool:[],
          necesidad:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        dea:this.fb.group({
          bool:[],
          necesidad:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        red_contra_incendios:this.fb.group({
          bool:[],
          necesidad:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        extintor:this.fb.group({
          bool:[],
          necesidad:[],
          observaciones:this.fb.group({
          }),
          vigencia:[],
          calificacion:[],
        }),
      }),
      elementos_accesibilidad:this.fb.group({
        accesos_peatonales:this.fb.group({
          bool:[],
          calificacion:[],
          observaciones:this.fb.group({
          }),
        }),
        circulacion_movilidad_reducida:this.fb.group({
          bool:[],
          necesidad:[],
          cumplimiento:[],
          calificacion:[],
          observaciones:this.fb.group({
          }),
        }),
        acceso_movilidad_reducida:this.fb.group({
          bool:[],
          necesidad:[],
          cumplimiento:[],
          calificacion:[],
          observaciones:this.fb.group({
          }),
        }),
        parqueadero:this.fb.group({
          bool:[],
          calificacion:[],
          observaciones:this.fb.group({
          }),
        }),
        rutas_buses:this.fb.group({
          bool:[],
          observaciones:this.fb.group({
          }),
        }),
        estaciones_metro:this.fb.group({
          bool:[],
          observaciones:this.fb.group({
          }),
        }),
        ciclo_ruta:this.fb.group({
          bool:[],
          observaciones:this.fb.group({
          }),
        }),
      }),
      elementos_inclusion:this.fb.group({
        cps_discapacidad:this.fb.group({
          bool:[],
          observaciones:this.fb.group({
          }),
        }),
        cps_adulto_mayor:this.fb.group({
          bool:[],
          observaciones:this.fb.group({
          }),
        }),
        senalizacion_movilidad_reducida:this.fb.group({
          bool:[],
          necesidad:[],
          cumplimiento:[],
          calificacion:[],
          observaciones:this.fb.group({
          }),
        }),
        banios_movilidad_reducida:this.fb.group({
          bool:[],
          necesidad:[],
          cumplimiento:[],
          calificacion:[],
          observaciones:this.fb.group({
          }),
        }),
        bicicleteros:this.fb.group({
          bool:[],
          calificacion:[],
          observaciones:this.fb.group({
          }),
        })
      }),
      elementos_forestales:this.fb.group({
        arboles:this.fb.group({
          
        }),
        roceria:this.fb.group({

        }),
        cobertura_vegetal:this.fb.group({
          adecuacion:[],
          calificacion:[],
          observaciones:this.fb.group({
          }),
        }),
        conecticidad_ecologica:this.fb.group({
          bool:[],
          observaciones:this.fb.group({
          }),
        })
      }),
      manejo_residuos:this.fb.group({
        puntos_ecologicos:this.fb.group({
          bool:[],
          necesidad:[],
          cantidad:[],
          suficiente:[],
          estado:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        papeleras_banios:this.fb.group({
          bool:[],
          necesidad:[],
          cantidad:[],
          suficiente:[],
          estado:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        cajas:this.fb.group({
          bool:[],
          necesidad:[],
          cantidad:[],
          suficiente:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        papeleras:this.fb.group({
          bool:[],
          necesidad:[],
          cantidad:[],
          suficiente:[],
          estado:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        guardian:this.fb.group({
          bool:[],
          necesidad:[],
          cantidad:[],
          suficiente:[],
          cumplimiento:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        punto_recopilas:this.fb.group({
          bool:[],
          observaciones:this.fb.group({
          }),
        }),
        residuos_especiales:this.fb.group({
          generan:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        residuos_peligrosos:this.fb.group({
          generan:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        acopio:this.fb.group({
          bool:[],
          necesidad:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        })
      }),
      almacenamiento_sustancias:this.fb.group({
        presencia_sustancias:this.fb.group({
          bool:[],
          observaciones:this.fb.group({
          }),
        }),
        matriz_sustancias:this.fb.group({
          bool:[],
          cumplimiento:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        kit_antiderrames:this.fb.group({
          bool:[],
          cumplimiento:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        tarjetas_emergencia:this.fb.group({
          bool:[],
          cumplimiento:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        epp:this.fb.group({
          bool:[],
          cumplimiento:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        senalizacion_etiquetado:this.fb.group({
          cumplimiento:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        }),
        cumplimiento_sustancias:this.fb.group({
          cumplimiento:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        })
      }),
      sanidad:this.fb.group({
        vectores_presentes:this.fb.group({
          bool:[],
          calificacion:[],
        })
      }),
      permisos:this.fb.group({
        quebradas_aledanias:this.fb.group({
          bool:[],
          calificacion:[],
        })
      }),
      emisiones:this.fb.group({
        planta_energia:this.fb.group({
          bool:[],
          estado:[],
          cumplimiento:[],
          tipo_combustible:[],
          fecha_ultimo_mantenimiento:[],
          observaciones:this.fb.group({
          }),
          calificacion:[],
        })
      }),
      elaborado_por:this.fb.group({

      }),
      revisado_por:this.fb.group({
        
      })
    });
  }

  createSections(){
    this.qualificationsSections = [
      { 
        title: 'Lorem ipsum',
        panelOpenState: false,
        form:  this.fb.group({
          campo1: [""],
          campo2: [""],
        }),
        typeScenario: 'PISCINAS',
      },
      { 
        title: 'Lorem ipsum',
        panelOpenState: false,
        form:  this.fb.group({
          campo1: [""],
          campo2: [""],
        }),
        typeScenario: 'PISCINAS',
      }
    ]
  }

  save(){
    
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

}
