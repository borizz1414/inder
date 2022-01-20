import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-diagnosis',
  templateUrl: './detail-diagnosis.component.html',
  styleUrls: ['./detail-diagnosis.component.scss']
})
export class DetailDiagnosisComponent implements OnInit {

  formGroup: FormGroup;
  id : string = '';
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private activeRoute : ActivatedRoute,
  ) {
    this.loadForm();
  }

  ngOnInit(): void {
    /*this.activeRoute.params.pipe(
      switchMap((params: Params) => {
        return this._scenarios.getLegalScenario(params.id)
      })
    )
    .subscribe((resp: any) => {
        this.id = resp.data.id;
        console.log('get scenario ', this.scenario);
        this.loadFormValues(resp.data);
        this.isLoading = false;
     }, 
     (err: any) => console.log(err))*/
     this.isLoading = false;
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: [{value: 'Cancha Polideportiva la Polvoreda', disabled: true}, Validators.required],
      version: [{value: '4', disabled: true}, Validators.required],
      tipo_escenario: [{value: '', disabled: true}, Validators.required],
      calificacion_general: [{value: '', disabled: true}, Validators.required],
      calificacion_1: [{value: '', disabled: true}, Validators.required],
      calificacion_2: [{value: '', disabled: true}, Validators.required],
      calificacion_3: [{value: '', disabled: true}, Validators.required],
      calificacion_4: [{value: '', disabled: true}, Validators.required],
    });
  }

  loadFormValues(data){
    this.formGroup.get('nombre_escenario').setValue(data.nombre_escenario);
    this.formGroup.get('version').setValue(data.version);
    this.formGroup.get('tipo_escenario').setValue(data.tipo_escenario);
    this.formGroup.get('calificacion_general').setValue(data.calificacion_general);
    this.formGroup.get('calificacion_1').setValue(data.calificacion_1);
    this.formGroup.get('calificacion_2').setValue(data.calificacion_2.nombremunicipio);
    this.formGroup.get('calificacion_3').setValue(data.calificacion_3);
    this.formGroup.get('calificacion_4').setValue(data.calificacion_4);
  }

}
