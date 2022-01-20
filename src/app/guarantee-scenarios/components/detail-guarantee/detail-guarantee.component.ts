import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GuaranteeService } from "../../services/guarantee.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-detail-guarantee",
  templateUrl: "./detail-guarantee.component.html",
  styleUrls: ["./detail-guarantee.component.scss"],
})
export class DetailGuaranteeComponent implements OnInit {
  formGroup: FormGroup;
  idGuarantee;


  constructor(
    private fb: FormBuilder,
    private _guarantee: GuaranteeService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    
  }

  ngOnInit(): void {
    this.loadForm();
    this.activatedRoute.params.subscribe((params) => {
      this.idGuarantee = params.id;
      if (this.idGuarantee) this.getGuarantee(this.idGuarantee);
    });
  }
  goBack(){
    this.location.back()
  }
  getGuarantee(id) {
    this._guarantee.getGuarantee(id).subscribe((resp) => {
      console.log(resp);
      this.setFormValue(resp.data);
    });
  }
  setFormValue(data) {
    if(data.tipo_garantia) this.formGroup.get("tipo_garantia").setValue(data.tipo_garantia.nombre);
    this.formGroup.get("fecha_inicial").setValue(data.fecha_inicio);
    this.formGroup.get("fecha_final").setValue(data.fecha_fin);
  }
  loadForm() {
    this.formGroup = this.fb.group({
      tipo_garantia: [null, Validators.required],
      fecha_inicial: [null],
      fecha_final: [null],
    });
  }
}
