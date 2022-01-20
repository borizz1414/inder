import {
  Component,
  OnInit,
  Input,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-detail-property",
  templateUrl: "./detail-property.component.html",
  styleUrls: ["./detail-property.component.scss"],
})
export class DetailPropertyComponent implements OnInit {
  formGroup: FormGroup;
  @Input() property;
  @Input() scenario;

  constructor(private fb: FormBuilder) {
    this.loadForm();
  }

  ngOnInit(): void {
    if (this.scenario) this.setFormValue();
  }

  setFormValue() {
    this.formGroup.get("nombre_escenario").setValue(this.scenario.nombre);
    this.formGroup.get("area").setValue(this.property.area);
    this.formGroup.get("nombre").setValue(this.property.nombre);
    this.formGroup.get("direccion").setValue(this.scenario.direccion);
    this.formGroup.get("matricula").setValue(this.property.matricula);
    this.formGroup
      .get("codigo_activo_fijo")
      .setValue(this.property.codigo_activo_fijo);
    this.formGroup.get("valor_fiscal").setValue(this.property.valor_fiscal);
    this.formGroup.get("destination").setValue(this.property.tipocontrato.nombre);
  }
  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: [{ value: "", disabled: true }, Validators.required],
      direccion: [{ value: "", disabled: true }, Validators.required],
      nombre: [{ value: "", disabled: true }, Validators.required],
      area: [{ value: "", disabled: true }, Validators.required],
      matricula: [{ value: "", disabled: true }, Validators.required],
      codigo_activo_fijo: [{ value: "", disabled: true }, Validators.required],
      valor_fiscal: [{ value: "", disabled: true }, Validators.required],
      destination: [{ value: "", disabled: true }, Validators.required],
    });
  }
}
