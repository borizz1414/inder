import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormArray, Form } from '@angular/forms';
import { piscina } from "./optionsPool";
@Injectable({
  providedIn: "root",
})
export class PoolService {
  form;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      observaciones:new FormArray([])
    })
  }
  get obsAuto1():FormArray{
    return this.form.get('observaciones') as FormArray
  }
  autoComplete1(value) {
    console.log(value,'value service')
    console.log(piscina.area_juego.playa.observaciones[0],'piscina.area_juego.playa.observaciones[0]')
    if (value == piscina.area_juego.playa.observaciones[0]) {
      return this.fb.group({
        grietas:[""],
        // desgaste_superficie: [""],
        // asentamientos: [""],
        // huecos: [""],
        // escalas_entre_juntas: [""],
        // separacion_juntas: [""],
        // fisuras: [""],
      })
      
    }
    if (value == piscina.area_juego.playa.observaciones[1]) {
      return this.fb.group({
        grietas:[""],
        desgaste_superficie: [""],
        asentamientos: [""],
        huecos: [""],
        escalas_entre_juntas: [""],
        separacion_juntas: [""],
        fisuras: [""],
      })
      
    }
    if (value == piscina.area_juego.playa.observaciones[2]) {
      return this.fb.group({
        desprendimiento_material:[""],
        asentamientos: [""],
        huecos: [""],
        desgaste_superficie: [""],
        grietas: [""],
        desprendido: [""],
      })
      
    }
    if (value == piscina.area_juego.playa.observaciones[3]) {
      return this.fb.group({
        asentamientos:[""],
        huecos: [""],
        desprendimiento_material: [""],
        rotura_material: [""],
        desgaste_superficie: [""],
      })
      
    }

    if (value == piscina.area_juego.playa.observaciones[4]) {
      return this.fb.group({
        empozamiento_charcos:[""],
        asentamientos: [""],
        faltan_tramos_areas: [""],
        huecos: [""],
        desgaste_superficie: [""],
        fisuras: [""],
        grietas: [""],
      })
      
    }
    if (value == piscina.area_juego.playa.observaciones[5]) {
      return this.fb.group({
        asentamientos: [""],
        huecos: [""],
        desgaste_superficie: [""],
        desprendimiento_material: [""],
        rotura_material: [""],
      })
      
    }
    if (value == piscina.area_juego.playa.observaciones[6]) {
      return this.fb.group({
        huecos: [""],
        asentamientos: [""],
        quebrada: [""],
        faltan_piezas: [""],
        desgaste_superficie: [""],
      })
      
    }
    if (value == piscina.area_juego.playa.observaciones[7]) {
      return this.fb.group({
        roturas: [""],
        desprendimiento_material: [""],
        huecos: [""],
        separacion_entre_piezas: [""],
        escalas_juntas_piezas: [""],
      })
      
    }
    console.log(this.form.value, 'formvalue service')
    return this.form.value
  }
}
