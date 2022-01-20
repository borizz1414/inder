import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from "@angular/common";

import { ScenariosService } from 'src/app/core/services/scenarios.service';

@Component({
  selector: 'app-detail-scenario',
  templateUrl: './detail-scenario.component.html',
  styleUrls: ['./detail-scenario.component.scss']
})
export class DetailScenarioComponent implements OnInit {

  formGroup: FormGroup;
  id : string = '';
  isLoading = true;
  rol = null;
  editRoute = "/escenarios-planeacion/inicio/editar";

  constructor(
    private fb: FormBuilder,
    private activeRoute : ActivatedRoute,
    private _location: Location,
    private _scenarios : ScenariosService
  ) { 
    this.loadForm();
    
    // Obteniendo rol para diferenciar la ruta de editar
    this.rol = JSON.parse(localStorage.getItem('user'))?.roles;
    console.log('rol', this.rol);

    if(this.rol === 'subdireccion'){
      "/escenarios-subdireccion/editar";
    }
  }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      switchMap((params: Params) => {
        return this._scenarios.getScenario(params.id)
      })
    )
    .subscribe((resp: any) => {
        console.log('get scenario ', resp.data);
        this.id = resp.data.id;
        this.loadFormValues(resp.data);
        this.isLoading = false;
     }, 
     (err: any) => console.log(err))
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: [{value: '', disabled: true}, Validators.required],
      telefono: [{value: '', disabled: true}, Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      municipio: [{value: '', disabled: true}, Validators.required],
      barrio: [{value: '', disabled: true}, Validators.required],
      direccion: [{value: '', disabled: true}, Validators.required],
    });
  }

  loadFormValues(data){
    this.formGroup.get('nombre_escenario').setValue(data?.nombre || '');
    this.formGroup.get('telefono').setValue(data?.telefono || '');
    this.formGroup.get('email').setValue(data?.email || '');
    this.formGroup.get('municipio').setValue(data?.barrio?.municipio?.nombremunicipio || '');
    this.formGroup.get('barrio').setValue(data?.barrio?.nombrebarrio || '');
    this.formGroup.get('direccion').setValue(data?.direccion || '');
  }

  goBack(){
    this._location.back()
  }

}
