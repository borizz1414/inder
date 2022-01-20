import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClimbingWallService {
  obs1={
    concreto:[],
    asfalto:[],
    sintetica:[],
    pintura_plastica:[],
    madera:[],
    adoquines:[],

  }
  
  obs2={
    cubierta:{
      concreto:{
        grietas:false,
        humedad:false,
        falta_mantenimiento:false

      },
      madera_teja:{
        
      }, 
      estructura_metálica_tejas:[]
    },
    pared:[],
    piso:{
      baldosa:[], 
      concreto:[],
      ceramica:[]
    },
    puerta:{
      madera:[],
      aluminio:[],
      lamina_acero:[],
},
    ventana:{
      malla_tubería:[],
      aluminio_vidrio:[],
      madera_vidrio:[],
      lamina_acero_vidrio:[]
    },
    cerradura:[],
    reja:{
      hierro:[],
      aluminio:[],
      tuberia:[]
    },
    cerramientos:{
      muros_contencion:{
        concreto:[],
        gaviones:[],
        combinado:[]
      }
    }

  }
  constructor() { }

  getObs1(){
    return this.obs1;
  }
}
