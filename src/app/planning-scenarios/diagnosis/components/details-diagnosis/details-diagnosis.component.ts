import { Location } from "@angular/common";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-details-diagnosis',
  templateUrl: './details-diagnosis.component.html',
  styleUrls: ['./details-diagnosis.component.scss']
})
export class DetailsDiagnosisComponent implements OnInit ,OnChanges {
  formGroup: FormGroup;
  @Input() property;
  @Input() scenario;

  constructor(private fb: FormBuilder,
    private _location: Location) {
    this.loadForm();
  }

  ngOnInit(): void {
    if (this.scenario) this.setFormValue();
  }
  ngOnChanges() {
    if (this.scenario) this.setFormValue();
  }
  goBack() {
    this._location.back();
  }
  setFormValue() {
    this.formGroup.get("scenarioName").setValue(this.scenario.nombre);
    this.formGroup.get("m2Area").setValue(this.property.area);
    this.formGroup.get("propertyName").setValue(this.property.nombre);
    this.formGroup.get("address").setValue(this.scenario.direccion);
    this.formGroup.get("enrollment").setValue(this.property.matricula);
    this.formGroup
      .get("FixedAssetCode")
      .setValue(this.property.codigo_activo_fijo);
    this.formGroup.get("taxValue").setValue(this.property.valor_fiscal);
    this.formGroup.get("destination").setValue(this.property.tipocontrato.nombre);
  }
  loadForm() {
    this.formGroup = this.fb.group({
      scenarioName: [{ value: "", disabled: true }, Validators.required],
      address: [{ value: "", disabled: true }, Validators.required],
      propertyName: [{ value: "", disabled: true }, Validators.required],
      m2Area: [{ value: "", disabled: true }, Validators.required],
      enrollment: [{ value: "", disabled: true }, Validators.required],
      FixedAssetCode: [{ value: "", disabled: true }, Validators.required],
      taxValue: [{ value: "", disabled: true }, Validators.required],
      destination: [{ value: "", disabled: true }, Validators.required],
    });
  }
}

