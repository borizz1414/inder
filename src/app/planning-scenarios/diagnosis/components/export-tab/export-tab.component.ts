
import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ScenariosService } from "../../../../core/services/scenarios.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-export-tab',
  templateUrl: './export-tab.component.html',
  styleUrls: ['./export-tab.component.scss']
})
export class ExportTabComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  scenariOptions = [];
  formGroup: FormGroup;
  constructor(
    private _scenarios: ScenariosService,
    private _fb: FormBuilder,
    private _location: Location
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}
  buildForm() {
    this.formGroup = this._fb.group({
      tipo_escenario: ["", Validators.required],
      tipo_archivo: ["", Validators.required],
    });
    this.fetchScenarioOptions();
  }
  goBack() {
    this._location.back();
  }
  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  fetchScenarioOptions(search = "") {
    let params = null;
    if (search) {
      params = {
        nombre: search,
      };
    }
    this._scenarios.getScenarioOptions(params).subscribe(
      (resp: any) => {
        this.scenariOptions = resp.data;
        // console.log("opciones de escenarios: ", this.scenariOptions);
      },
      (err: any) => console.log(err)
    );
  }
}
