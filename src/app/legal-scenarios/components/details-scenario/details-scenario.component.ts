import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ScenariosService } from 'src/app/core/services/scenarios.service';

@Component({
  selector: 'app-details-scenario',
  templateUrl: './details-scenario.component.html',
  styleUrls: ['./details-scenario.component.scss']
})
export class DetailsScenarioComponent implements OnInit {

  formGroup: FormGroup;
  id = null;
  isLoading = true;
  urls = {
    acta_entrega: '',
    avaluo_comercial: '',
    estudio_titulo_predio: '',
    ficha_catastral: '',
  }

  constructor(
    private fb: FormBuilder,
    private activeRoute : ActivatedRoute,
    private _scenarios : ScenariosService
  ) {
    this.loadForm();
  }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      switchMap((params: Params) => {
        return this._scenarios.getScenario(params.id)
      })
    )
    .subscribe((resp: any) => {
        this.id = resp.data.id;
        console.log('get scenario ', resp.data);
        this.loadFormValues(resp.data);
        this.isLoading = false;
     }, 
     (err: any) => console.log(err),
    )
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: [{value: '', disabled: true}, Validators.required],
      despacho: [{value: '', disabled: true}, Validators.required],
      municipio: [{value: '', disabled: true}, Validators.required],
      barrio: [{value: '', disabled: true}, Validators.required],
      direccion: [{value: '', disabled: true}, Validators.required],
      tipoEquipamiento: [{value: '', disabled: true}, Validators.required],
      acta_entrega: [{value: '', disabled: true}, Validators.required],
      avaluo_comercial: [{value: '', disabled: true}, Validators.required],
      estudio_titulo_predio: [{value: '', disabled: true}, Validators.required],
      ficha_catastral: [{value: '', disabled: true}, Validators.required],
    });
  }

  loadFormValues(data){
    console.log(data,'data details')
    this.formGroup.get('nombre_escenario').setValue(data.nombre);
    if(!!data.despacho) this.formGroup.get('despacho').setValue(data.despacho.nombre);
    if(!!data.municipio) this.formGroup.get('municipio').setValue(data.municipio.nombremunicipio);
    this.formGroup.get('barrio').setValue(data.barrio.nombrebarrio);
    this.formGroup.get('direccion').setValue(data.direccion);
    this.formGroup.get('tipoEquipamiento').setValue(data?.tipo_equipamiento_id || '');

    this.formGroup.get('acta_entrega').setValue(data.acta_entrega ? 
      `acta de entrega.${data.acta_entrega.split(".")[1]}` : '');

    this.formGroup.get('avaluo_comercial').setValue(data.avaluo_comercial ? 
      `avalúo comercial.${data.avaluo_comercial.split(".")[1]}` : '');

    this.formGroup.get('estudio_titulo_predio').setValue(data.estudio_titulo_predio ? 
      `títulos de predio.${data.estudio_titulo_predio.split(".")[1]}` : '');

    this.formGroup.get('ficha_catastral').setValue(data.ficha_catastral ? 
      `ficha catastral.${data.ficha_catastral.split(".")[1]}` : '');

    this.urls = {
      acta_entrega: data.acta_entrega || '',
      avaluo_comercial: data.avaluo_comercial || '',
      estudio_titulo_predio: data.estudio_titulo_predio || '',
      ficha_catastral: data.ficha_catastral || '',
    }
  }

  downloadFile(fileName:string){
    
    if(this.urls[fileName]){  

      let params = {
        url: this.urls[fileName],
        nombre: this.formGroup.value[fileName],
      }

      this._scenarios.downloadFile(params)
    }
  }

}
