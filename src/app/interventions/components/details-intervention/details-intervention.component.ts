
import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { InterventionsService } from '../../services/interventions.service';
import { ScenariosService } from '../../../core/services/scenarios.service';

@Component({
  selector: 'app-details-intervention',
  templateUrl: './details-intervention.component.html',
  styleUrls: ['./details-intervention.component.scss']
})
export class DetailsInterventionComponent implements OnInit {
  formGroup: FormGroup;
  idIntervention;
  dataIntervention;

  constructor(
    private fb: FormBuilder,
    private _interventions: InterventionsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _scenarios: ScenariosService
  ) {
    
  }

  ngOnInit(): void {
    this.loadForm();
    this.activatedRoute.params.subscribe((params) => {
      this.idIntervention = params.id;
      if (this.idIntervention) this.getIntervention(this.idIntervention);
    });
  }
  goBack(){
    this.location.back()
  }
  getIntervention(id) {
    this._interventions.getIntervention(id).subscribe((resp) => {
      console.log(resp);
      this.dataIntervention = resp.data;
      this.setFormValue(resp.data);
    });
  }
  setFormValue(data) {
    if(data.contratista) this.formGroup.get("contratista").setValue(`${data.contratista.numero_identificacion} - ${data.contratista.nombre} ${data.contratista.apellido}`);
    if(data.fuente_financiacion) this.formGroup.get("fuente_financiacion").setValue(data.fuente_financiacion.nombre);
    this.formGroup.get("contrato").setValue(data.contrato);
    this.formGroup.get("valor").setValue(data.valor);
    this.formGroup.get("objeto_descripcion").setValue(data.descripcion);
    this.formGroup.get("fecha_inicio").setValue(data.fecha_priorizacion_inicio);
    this.formGroup.get("fecha_fin").setValue(data.fecha_priorizacion_fin);
    this.formGroup.get("acta_cantidades").setValue(data.nombre_acta_cantidades_finales);
  }
  loadForm() {
    this.formGroup = this.fb.group({
      contratista: [null],
      contrato: [null],
      valor: [null],
      fuente_financiacion: [null],
      objeto_descripcion: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
      acta_cantidades: [null],
    });
  }
  downloadFile(){
    this._scenarios.downloadFile({url:this.dataIntervention.acta_cantidades_finales, nombre:this.dataIntervention.nombre_acta_cantidades_finales});
  }
}

