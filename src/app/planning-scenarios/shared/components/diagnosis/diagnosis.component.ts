import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ScenariosService } from '../../../../core/services/scenarios.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  idScenario;
  formGroup: FormGroup;
  nameScenarioOptions = [];
  typeScenarioOptions = [];
  scenariOptions;
  @Input() isEditing : boolean;
  //@Output() saveInfo: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private _scenario: ScenariosService) { }

  ngOnInit(): void {
    this.loadForm();
    this.filterScenarioOptions()
  }
  selectScenario(id){
    this.idScenario = id;
  }
  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: ["", Validators.required],
      tipo_escenario: ["", Validators.required],
    });
  }

  save(){
    
  }
  filterScenarioOptions() {

      this.formGroup.get("nombre_escenario").valueChanges.subscribe((value) => {
        this.fetchScenarioOptions(value);
        const scenario = this.scenariOptions.find(
          (item) => item.nombre === value
        );
      });

  }
  fetchScenarioOptions(search = "") {
    let params = null;
    if (search) {
      params = {
        nombre: search,
      };
    }
    this._scenario.getScenarioOptions(params).subscribe(
      (resp: any) => {
        this.scenariOptions = resp.data;
        // console.log("opciones de escenarios: ", this.scenariOptions);
      },
      (err: any) => console.log(err)
    );
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
