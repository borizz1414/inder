import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { switchMap, finalize } from "rxjs/operators";
import { ScenariosService } from "../../../../core/services/scenarios.service";
import { NotifierService } from "../../../../core/services/notifier.service";
import { DeleteModalComponent } from "src/app/shared/components/delete-modal/delete-modal.component";
import { CustomValidators } from "src/app/utils/validators";
import { Router } from "@angular/router";

@Component({
  selector: "app-form-property",
  templateUrl: "./form-property.component.html",
  styleUrls: ["./form-property.component.scss"],
})
export class FormPropertyComponent implements OnInit {
  formGroup: FormGroup;
  property;
  baseObjProperty: any;
  isCollapsed: boolean = false;
  contract: boolean = true;
  propertyDetail;
  idProperty: number = null;
  configDeleteModal = {
    title: "¿Seguro de Eliminar éste Bien Inmueble?",
    bodyText: "",
  };
  configLessees = {
    name: "Arrendatario",
    columns: ["nombre", "identificación", "teléfono", "email", "dirección"],
  };
  configSupervisors = {
    name: "Supervisor",
    columns: ["nombre", "identificación"],
  };
  configBorrowers = {
    name: "Comodatario",
    columns: ["nombre", "identificación", "teléfono", "email", "dirección"],
  };
  tenants = [];
  supervisors = [];
  borrowers = [];
  isEditing: boolean = false;
  isDetail: boolean = false;
  typeContractOptions = [];
  dependenceOptions = [];
  strategyOptions = [];
  dispositionOptions = [];
  typeIdOptions = [];
  options: boolean = false;
  isLoadingSave: boolean = false;
  scenariOptions = [];
  fetchOptions;

  /////// Configuracion de los iconos se van a mostar view, edit y delete
  configCumulative = {
    visible: false,
    edit: false,
    delete: false,
  };

  @Input() dataChild;
  @Input() idScenario: number;
  @Input() scenario;
  @Input() optionsSelect;
  @Output() saveProperty: EventEmitter<any> = new EventEmitter();
  @Output() formCollapsed: EventEmitter<any> = new EventEmitter();
  @Output() showDetail: EventEmitter<any> = new EventEmitter();
  @Output() eventDependence: EventEmitter<any> = new EventEmitter();
  @Output() deleteProperty: EventEmitter<any> = new EventEmitter();
  @Output() fetchdataChild: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private _scenarios: ScenariosService,
    private _notifier: NotifierService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadForms();
    this.setTypeContractValidators();
  }
  changeTypeContract(value) {
    if (value == 2) {
      this.changeDependence();
    }
    this.setTypeContractValidators();
  }

  setValueForm() {
    this.supervisors = this.dataChild.supervisores;
    this.tenants = this.dataChild.arrendatarios;
    this.borrowers = this.dataChild.comodatarios;
    this.formGroup.get("scenarioName").setValue(this.scenario.nombre);
    this.formGroup.get("address").setValue(this.scenario.direccion);
    this.formGroup
      .get("fixedAssetCode")
      .setValue(this.dataChild.codigo_activo_fijo);
    this.formGroup.get("typeContract").setValue(this.dataChild.tipocontrato.id);
    this.contract = this.dataChild.contrato;
    this.formGroup
      .get("contractNumber")
      .setValue(this.dataChild.numero_contrato);
    const dateFinal = moment(this.dataChild.fecha_final_contrato);
    const dateInitial = moment(this.dataChild.fecha_inicial_contrato);

    this.formGroup.get("initialContractDate").setValue({
      year: dateInitial.year(),
      month: dateInitial.month() + 1,
      day: dateInitial.date(),
    });
    this.formGroup.get("finalContractDate").setValue({
      year: dateFinal.year(),
      month: dateFinal.month() + 1,
      day: dateFinal.date(),
    });
    this.formGroup.get("enrollment").setValue(this.dataChild.matricula);
    this.formGroup.get("propertyName").setValue(this.dataChild.nombre);
    this.formGroup.get("m2Area").setValue(this.dataChild.area);
    this.formGroup.get("canonValue").setValue(this.dataChild.valor_canon);
    this.formGroup.get("taxValue").setValue(this.dataChild.valor_fiscal);
    this.formGroup
      .get("totalContractValue")
      .setValue(this.dataChild.valor_total_contrato);
    this.formGroup
      .get("objectContract")
      .setValue(this.dataChild.objeto_contrato);

    this.formGroup.get("typeContract").setValue(this.dataChild.tipocontrato.id);
    this.contract = this.dataChild.contrato;

    this.formGroup.get("contractLink").setValue(this.dataChild.enlace);
    if (!!this.dataChild.objeto_comodato)
      this.formGroup.get("objectLoan").setValue(this.dataChild.objeto_comodato);
    if (!!this.dataChild.disposicion)
      this.formGroup.get("disposition").setValue(this.dataChild.disposicion.id);
      if (!!this.dataChild.estrategia) this.formGroup
      .get("strategy")
      .setValue(this.dataChild.estrategia.id);
    if (!!this.dataChild.dependencia)
      this.formGroup.get("dependence").setValue(this.dataChild.dependencia.id);
    this.isCollapsed = true;
    this.changeContract();
    this.configCumulative.delete = true;
    this.configCumulative.edit = true;
    this.configCumulative.visible = true;
  }
  baseObjPropery() {
    const form = this.formGroup;
    const dateStart = this.getDateFormat(form.get("initialContractDate").value);
    // const dateEnd = "2030-09-01";
    const dateEnd = this.getDateFormat(form.get('finalContractDate').value);

    this.baseObjProperty = {
      nombre_escenario: this.idScenario,
      nombre: form.get("propertyName").value,
      area: form.get("m2Area").value,
      matricula: form.get("enrollment").value,
      codigo_activo_fijo: form.get("fixedAssetCode").value,
      tipo_contrato: form.get("typeContract").value,
      tipo_contrato_nombre: this.getTypeContractName(
        form.get("typeContract").value
      ),
      numero_contrato: form.get("contractNumber").value,
      valor_canon: form.get("canonValue").value,
      disposicion: form.get("disposition").value,
      valor_total_contrato: form.get("totalContractValue").value,
      objeto_contrato: form.get("objectContract").value,
      disposicion_bien_inmuebles_id: form.get("disposition").value,
      enlace: form.get("contractLink").value,
      dependencia_bien_inmuebles_id: form.get("dependence").value,
      estrategia_bien_inmuebles_id: form.get("strategy").value,
      valor_fiscal: form.get("taxValue").value,
      // objeto_comodato: form.get('fixedAssetCode').value,
      // observaciones_comodato: form.get('fixedAssetCode').value,

      // id_arrendatario: [""],
      // nombre_completo_arrendatario: ["Arrendatario prueba $$$ actualizando"],
      // tipo_identificacion_id_arrendatario: [10],
      // numero_identificacion_arrendatario: [85692488888],
      // fotocopia_cedula_arrendatario: [
      //   "data:application/pdf;base64,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L0NvbnRlbnRzIDIgMCBSPj4KZW5kb2JqCgo0IDAgb2JqCjw8L1R5cGUvUGFnZXMKL1Jlc291cmNlcyAxMSAwIFIKL01lZGlhQm94WyAwIDAgNjEyIDc5MiBdCi9LaWRzWyAxIDAgUiBdCi9Db3VudCAxPj4KZW5kb2JqCgoxMiAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgNCAwIFIKL09wZW5BY3Rpb25bMSAwIFIgL1hZWiBudWxsIG51bGwgMF0KL0xhbmcoZXMtQ08pCj4+CmVuZG9iagoKMTMgMCBvYmoKPDwvQ3JlYXRvcjxGRUZGMDA1NzAwNzIwMDY5MDA3NDAwNjUwMDcyPgovUHJvZHVjZXI8RkVGRjAwNEMwMDY5MDA2MjAwNzIwMDY1MDA0RjAwNjYwMDY2MDA2OTAwNjMwMDY1MDAyMDAwMzYwMDJFMDAzND4KL0NyZWF0aW9uRGF0ZShEOjIwMjEwOTE1MTA1OTMyLTA1JzAwJyk+PgplbmRvYmoKCnhyZWYKMCAxNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDYxODMgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAwMjAyIDAwMDAwIG4gCjAwMDAwMDYzMjYgMDAwMDAgbiAKMDAwMDAwMDIyMiAwMDAwMCBuIAowMDAwMDA1Mzg3IDAwMDAwIG4gCjAwMDAwMDU0MDggMDAwMDAgbiAKMDAwMDAwNTYwMyAwMDAwMCBuIAowMDAwMDA1OTE3IDAwMDAwIG4gCjAwMDAwMDYwOTYgMDAwMDAgbiAKMDAwMDAwNjEyOCAwMDAwMCBuIAowMDAwMDA2NDI1IDAwMDAwIG4gCjAwMDAwMDY1MjIgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDE0L1Jvb3QgMTIgMCBSCi9JbmZvIDEzIDAgUgovSUQgWyA8NEZBNjY0QkY5QzJGQTRFNjQ5NzZEODQxOUMyOUYyMDE+Cjw0RkE2NjRCRjlDMkZBNEU2NDk3NkQ4NDE5QzI5RjIwMT4gXQovRG9jQ2hlY2tzdW0gLzNFREU2NEY2ODY0RDc2RjNBRjBGNDk2QkE0OEUwOEYzCj4+CnN0YXJ0eHJlZgo2Njk3CiUlRU9GCg==",
      // ],
      // email_arrendatario: ["Arrendatario@Arrendatario.com"],
      // telefono_arrendatario: [98797877777],
      // direccion_arrendatario: ["direccion Arrendatario actualizando"],
      // id_supervisor: [""],
      // nombre_completo_supervisores: [
      //   "supervisor de prueba Arrendamiento 99999",
      // ],
      // tipo_identificacion_id_supervisores: [10],
      // numero_identificacion_supervisores: [10000],
    };
  }
  buildLeaseObj() {
    this.baseObjProperty.contrato= `${this.contract}`;
    const dateStart = this.getDateFormat(this.formGroup.get("initialContractDate").value);
    // const dateEnd = "2030-09-01";
    const dateEnd = this.getDateFormat(this.formGroup.get('finalContractDate').value);
    this.baseObjProperty.fecha_inicial_contrato= dateStart;      
    this.baseObjProperty.fecha_final_contrato =  dateEnd;
    // Arrendatarios
    let id_arrendatario = [];
    console.log(this.tenants, "tenants");
    if (this.tenants.length) {
      this.tenants.forEach((item) => {
        if (this.idScenario !== undefined) {
          id_arrendatario = item.id;
        }
        console.log(item, "item");
        this.baseObjProperty.id_arrendatario = [id_arrendatario];
        this.baseObjProperty.nombre_completo_arrendatario = [
          item.nombre_completo,
        ];
        this.baseObjProperty.tipo_identificacion_id_arrendatario = [
          item.tipo_identificacion_id,
        ];
        this.baseObjProperty.numero_identificacion_arrendatario = [
          item.numero_identificacion,
        ];
        this.baseObjProperty.telefono_arrendatario = [item.telefono];
        this.baseObjProperty.direccion_arrendatario = [item.direccion];
        this.baseObjProperty.email_arrendatario = [item.email];
        this.baseObjProperty.fotocopia_cedula_arrendatario = [
          item.documentFile,
        ];
        //Supervisores
        let id_supervidor = [];
        if (this.supervisors.length) {
          this.supervisors.forEach((item) => {
            if (this.idScenario !== undefined) {
              id_supervidor = item.id;
            }
            this.baseObjProperty.id_supervisor = [id_supervidor];
            this.baseObjProperty.nombre_completo_supervisores = [item.nombre_completo];
            this.baseObjProperty.tipo_identificacion_id_supervisores = [
              item.tipo_identificacion_id,
            ];
            this.baseObjProperty.numero_identificacion_supervisores = [
              item.numero_identificacion,
            ];
          });
        }
      });
    }
  }

  buildLoanObj(form) {
     // Required fields
     const dateStart = this.getDateFormat(this.formGroup.get("initialContractDate").value);
     // const dateEnd = "2030-09-01";
     const dateEnd = this.getDateFormat(this.formGroup.get('finalContractDate').value);
     this.baseObjProperty.fecha_inicial_contrato= dateStart;      
     this.baseObjProperty.fecha_final_contrato =  dateEnd;
     this.baseObjProperty.objeto_comodato = form.objectLoan;
     this.baseObjProperty.valor_fiscal = parseInt(form.taxValue);
     this.baseObjProperty.contrato= `${this.contract}`;
     // Valor fiscal opcional
     /*if(form.taxValue){
       base.append("valor_fiscal", parseInt(form.taxValue));
     }*/
 
     // Observaciones opcional
     if (form.observations) {
      this.baseObjProperty.observaciones_comodato= form.observations;
     }
 
     // Comodatarios
     let id_comodatario = [];
     if (this.borrowers.length) {
       this.borrowers.forEach((item) => {
         if (this.idScenario !== undefined) {
           id_comodatario = item.id;
         }
         this.baseObjProperty.id_comodatario=[id_comodatario]
         this.baseObjProperty.nombre_completo_comodatario =[item.nombre_completo];
         this.baseObjProperty.tipo_identificacion_id_comodatario=[item.tipo_identificacion_id];
         this.baseObjProperty.numero_identificacion_comodatario = [item.numero_identificacion];
         this.baseObjProperty.telefono_comodatario = [item.telefono];
         this.baseObjProperty.direccion_comodatario = [item.direccion];
 
         if (item.email) {
          this.baseObjProperty.email_comodatario=[item.email];
         } else {
          this.baseObjProperty.email_comodatario = [``];
         }
 
         if (item.documentFile) {
          this.baseObjProperty.fotocopia_cedula_comodatario = [item.documentFile]
         } else {
          this.baseObjProperty.fotocopia_cedula_comodatario = [``]
         }
       });
     }
  }

  buildInstitutionalObj(form) {
    this.baseObjProperty.dependencia =  form.dependence
    this.baseObjProperty.estrategia = form.strategy;

  }
  verifyArrayPersons(){
    const form = this.formGroup.value;
    if(form.typeContract == 1){
      if(!this.tenants.length || !this.supervisors.length){
        this._notifier.showNotification(['Faltan Arrendatarios o Supervisores'], 'error');
        return false;
      }

    }else if(form.typeContract == 3){
      if(!this.borrowers.length){
        this._notifier.showNotification(['Faltan Comodatarios'], 'error');
        return false;
      }
    }
    return true;

  }
  buildBodyUpdate() {
    const form = this.formGroup.value;

    this.baseObjPropery();

    // // Arrendamiento
    if (form.typeContract == 1) {
      let leaseBody: any = this.buildLeaseObj();
      return leaseBody;
    }

    // Comodato
    if (form.typeContract == 3) {
      let loanBody: any = this.buildLoanObj(form);
      return loanBody;
    }

    // Uso institucional
    if (form.typeContract == 2) {
      let institutionalBody: any = this.buildInstitutionalObj(form);
      return institutionalBody;
    }

  }
  loadForms() {
    this.formGroup = this.fb.group({
      // Scenario Info
      scenarioName: ["", Validators.required],
      address: [{ value: "", disabled: true }],

      // Property Info
      propertyName: ["", [Validators.required, CustomValidators.maximumLength]],
      m2Area: ["", [Validators.required, CustomValidators.maximumLength]],
      enrollment: ["", [Validators.required, CustomValidators.maximumLength]],
      fixedAssetCode: ["", CustomValidators.maximumLength],

      // Property contract
      typeContract: [1, Validators.required],

      // Lease and Loan (Arrendamiento y Comodato)
      contractNumber: [
        "",
        [Validators.required, CustomValidators.maximumLength],
      ],
      initialContractDate: ["", Validators.required],
      finalContractDate: ["", Validators.required],

      // Lease (Arrendamiento)
      canonValue: ["", [Validators.required, CustomValidators.maximumLength]],
      totalContractValue: ["", CustomValidators.maximumLength],
      objectContract: [
        "",
        [Validators.required, CustomValidators.maximumLength],
      ],
      disposition: ["", Validators.required],
      contractLink: ["", CustomValidators.maximumLength],

      // Loan (Comodato)
      taxValue: [""],
      objectLoan: [""],
      observations: [""],

      // Institutional Use
      dependence: [""],
      strategy: [""],
    });

    //Set value form if Edit
    if (this.idScenario) {
      if (this.dataChild.id !== "") this.setValueForm();
    } else {
      this.configCumulative.visible = false;
      this.dataChild = false;
      this.isEditing = !this.isEditing;
      this.fetchScenarioOptions();
      this.filterScenarioOptions();
    }
  }

  filterScenarioOptions() {
    if (this.isEditing) {
      this.formGroup.get("scenarioName").valueChanges.subscribe((value) => {
        this.fetchScenarioOptions(value);

        const scenario = this.scenariOptions.find(
          (item) => item.nombre === value
        );
        console.log(scenario);
        this.formGroup
          .get("address")
          .setValue(scenario ? scenario.direccion : "");
      });
    }
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
  setTypeContractValidators() {
    const enrollment = this.formGroup.get("enrollment");
    const contractNumber = this.formGroup.get("contractNumber");
    const initialContractDate = this.formGroup.get("initialContractDate");
    const finalContractDate = this.formGroup.get("finalContractDate");
    const canonValue = this.formGroup.get("canonValue");
    const totalContractValue = this.formGroup.get("totalContractValue");
    const objectContract = this.formGroup.get("objectContract");
    const disposition = this.formGroup.get("disposition");
    const contractLink = this.formGroup.get("contractLink");
    const objectLoan = this.formGroup.get("objectLoan");
    const dependence = this.formGroup.get("dependence");
    const strategy = this.formGroup.get("strategy");
    const taxValue = this.formGroup.get("taxValue");

    // console.log(typeContract);
    // Arrendamiento

    if (this.formGroup.get("typeContract").value == 1) {
      enrollment.setValidators([
        Validators.required,
        CustomValidators.maximumLength,
      ]);
      initialContractDate.setValidators([Validators.required]);
      finalContractDate.setValidators([Validators.required]);
      canonValue.setValidators([
        Validators.required,
        CustomValidators.maximumLength,
      ]);
      totalContractValue.setValidators([CustomValidators.maximumLength]);
      objectContract.setValidators([
        Validators.required,
        CustomValidators.maximumLength,
      ]);
      disposition.setValidators([Validators.required]);
      contractLink.setValidators([CustomValidators.maximumLength]);
      objectLoan.setValidators(null);
      dependence.setValidators(null);
      strategy.setValidators(null);
    }

    // Comodato
    if (this.formGroup.get("typeContract").value == 3) {
      enrollment.setValidators([CustomValidators.maximumLength]);
      initialContractDate.setValidators([Validators.required]);
      taxValue.setValidators([Validators.required]);
      finalContractDate.setValidators([Validators.required]);
      objectLoan.setValidators([
        Validators.required,
        CustomValidators.maximumLength,
      ]);
      canonValue.setValidators(null);
      totalContractValue.setValidators(null);
      objectContract.setValidators(null);
      disposition.setValidators(null);
      contractLink.setValidators(null);
      dependence.setValidators(null);
      strategy.setValidators(null);
    }

    // Uso institucional
    if (this.formGroup.get("typeContract").value == 2) {
      enrollment.setValidators([CustomValidators.maximumLength]);
      dependence.setValidators([Validators.required]);
      strategy.setValidators([Validators.required]);
      contractNumber.setValidators(null);
      initialContractDate.setValidators(null);
      finalContractDate.setValidators(null);
      canonValue.setValidators(null);
      totalContractValue.setValidators(null);
      objectContract.setValidators(null);
      disposition.setValidators(null);
      contractLink.setValidators(null);
      objectLoan.setValidators(null);
    }

    enrollment.updateValueAndValidity();
    dependence.updateValueAndValidity();
    strategy.updateValueAndValidity();
    contractNumber.updateValueAndValidity();
    initialContractDate.updateValueAndValidity();
    finalContractDate.updateValueAndValidity();
    canonValue.updateValueAndValidity();
    totalContractValue.updateValueAndValidity();
    objectContract.updateValueAndValidity();
    disposition.updateValueAndValidity();
    contractLink.updateValueAndValidity();
    objectLoan.updateValueAndValidity();
  }

  changeDependence() {
    const dependence = this.formGroup.get("dependence").value;
    this.eventDependence.emit(dependence);
    console.log('eventDependenve')
  }

  changeContract() {
    const numero_contrato = this.formGroup.get("contractNumber");

    if (this.formGroup.value.typeContract != 2) {
      if (this.contract) {
        numero_contrato.setValidators([
          Validators.required,
          CustomValidators.maximumLength,
        ]);
      } else {
        numero_contrato.setValidators(null);
        numero_contrato.setValue("");
      }
    }
    numero_contrato.updateValueAndValidity();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.filterScenarioOptions();
    this.formCollapsed.emit(this.isCollapsed);
  }

  toggleDetail() {
    this.isDetail = !this.isDetail;
    this.showDetail.emit(this.isDetail);
  }

  setDetailInfo({
    nombre_escenario,
    direccion,
    nombre,
    area,
    matricula,
    FixedAssetCode,
    valor_fiscal,
    destination,
  }) {
    this.dataChild = {
      nombre_escenario,
      direccion,
      nombre,
      area,
      matricula,
      FixedAssetCode,
      valor_fiscal,
      destination,
    };
  }

  getDateFormat(date) {
    const { year, month, day } = date;
    const stringDate = `${year}-${month}-${day}`;
    // const newDate = moment(stringDate).format("DD-MM-YYYY");
    const newDate = moment(stringDate).format("YYYY-MM-DD");

    return newDate;
  }

  getTypeContractName(idTypeContract) {
    const position = parseInt(idTypeContract) - 1;
    return this.optionsSelect.typeContractOptions[position].nombre;
  }

  buildBaseValues(form) {
    let formData: any = new FormData();

    // Required fields
    console.log(this.idScenario, "build-idscenario");
    if (this.idScenario == undefined) {
      const { id: scenarioId } = this.scenariOptions.find(
        (item) => item.nombre === form.scenarioName
      );
      formData.append("nombre_escenario", scenarioId);
    } else {
      formData.append("nombre_escenario", this.idScenario);
    }

    formData.append("nombre", form.propertyName);
    formData.append("area", form.m2Area);
    formData.append("matricula", form.enrollment);
    formData.append("tipo_contrato", form.typeContract);
    formData.append(
      "tipo_contrato_nombre",
      this.getTypeContractName(form.typeContract)
    );

    // Matrícula opcional
    /*if(form.enrollment){
      formData.append("matricula", form.enrollment);
    }*/

    // Código de activo fijo opcional
    if (form.fixedAssetCode) {
      formData.append("codigo_activo_fijo", form.fixedAssetCode);
    }

    // Valores comunes para arrendamiento y comodato
    if (form.typeContract == 1 || form.typeContract == 3) {
      // Contract and number contract values
      if (this.contract) {
        formData.append("contrato", "true");
        formData.append("numero_contrato", form.contractNumber);
      } else {
        formData.append("contrato", "false");
      }

      // Initial and final date values
      formData.append(
        "fecha_inicial_contrato",
        this.getDateFormat(form.initialContractDate)
      );
      formData.append(
        "fecha_final_contrato",
        this.getDateFormat(form.finalContractDate)
      );
    }

    //return baseValues;
    return formData;
  }

  buildLeaseValue(form, base) {
    let msgNotifier = 'Falta';
    // Required fields
    base.append("valor_canon", form.canonValue);
    base.append("objeto_contrato", form.objectContract);
    base.append("disposicion", form.disposition);

    // Valor total del contrato opcional
    if (form.totalContractValue) {
      base.append("valor_total_contrato", form.totalContractValue);
    }

    // Enlace opcional
    if (form.contractLink) {
      base.append("enlace", form.contractLink);
    }

    // Arrendatarios
    let id_arrendatario = [];
    if (this.tenants.length) {
      this.tenants.forEach((item) => {
        if (this.idScenario !== undefined) {
          id_arrendatario = item.id;
        }
        base.append("id_arrendatario[]", id_arrendatario);
        base.append(
          "nombre_completo_arrendatario[]",
          `${item.nombre_completo}`
        );
        base.append(
          "tipo_identificacion_id_arrendatario[]",
          `${item.tipo_identificacion_id}`
        );
        base.append(
          "numero_identificacion_arrendatario[]",
          `${item.numero_identificacion}`
        );
        base.append("telefono_arrendatario[]", `${item.telefono}`);
        base.append("direccion_arrendatario[]", `${item.direccion}`);

        if (item.email) {
          base.append("email_arrendatario[]", `${item.email}`);
        } else {
          base.append("email_arrendatario[]", ``);
        }

        if (item.documentFile) {
          base.append("fotocopia_cedula_arrendatario[]", item.documentFile);
        } else {
          base.append("fotocopia_cedula_arrendatario[]", ``);
        }
      });
    }

    // Supervisores
    let id_supervidor = [];
    if (this.supervisors.length) {
      this.supervisors.forEach((item) => {
        if (this.idScenario !== undefined) {
          id_supervidor = item.id;
        }
        base.append("id_supervisor[]", id_supervidor);
        base.append(
          "nombre_completo_supervisores[]",
          `${item.nombre_completo}`
        );
        base.append(
          "tipo_identificacion_id_supervisores[]",
          `${item.tipo_identificacion_id}`
        );
        base.append(
          "numero_identificacion_supervisores[]",
          `${item.numero_identificacion}`
        );
      });
    }
    

    return base;
  }

  buildLoanValue(form, base) {
    // Required fields
    base.append("objeto_comodato", form.objectLoan);
    base.append("valor_fiscal", parseInt(form.taxValue));

    // Valor fiscal opcional
    /*if(form.taxValue){
      base.append("valor_fiscal", parseInt(form.taxValue));
    }*/

    // Observaciones opcional
    if (form.observations) {
      base.append("observaciones_comodato", form.observations);
    }

    // Comodatarios
    let id_comodatario = [];
    if (this.borrowers.length) {
      this.borrowers.forEach((item) => {
        if (this.idScenario !== undefined) {
          id_comodatario = item.id;
        }
        base.append("id_comodatario[]", id_comodatario);
        base.append("nombre_completo_comodatario[]", `${item.nombre_completo}`);
        base.append(
          "tipo_identificacion_id_comodatario[]",
          `${item.tipo_identificacion_id}`
        );
        base.append(
          "numero_identificacion_comodatario[]",
          `${item.numero_identificacion}`
        );
        base.append("telefono_comodatario[]", `${item.telefono}`);
        base.append("direccion_comodatario[]", `${item.direccion}`);

        if (item.email) {
          base.append("email_comodatario[]", `${item.email}`);
        } else {
          base.append("email_comodatario[]", ``);
        }

        if (item.documentFile) {
          base.append("fotocopia_cedula_comodatario[]", item.documentFile);
        } else {
          base.append("fotocopia_cedula_comodatario[]", ``);
        }
      });
    }

    return base;
  }
  buildInstitutionalUseValue(form, base) {
    base.append("dependencia", form.dependence);
    base.append("estrategia", form.strategy);

    return base;
  }

  buildBody() {
    const form = this.formGroup.value;

    let baseValues = this.buildBaseValues(form);

    // Arrendamiento
    if (form.typeContract == 1) {
      let leaseBody: any = this.buildLeaseValue(form, baseValues);
      return leaseBody;
    }

    // Comodato
    if (form.typeContract == 3) {
      let loanBody: any = this.buildLoanValue(form, baseValues);
      return loanBody;
    }

    // Uso institucional
    if (form.typeContract == 2) {
      let institutionalBody: any = this.buildInstitutionalUseValue(
        form,
        baseValues
      );
      return institutionalBody;
    }
  }

  save() {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      return;
    }
    const form = this.formGroup.value;


    if (form.typeContract == 1 || form.typeContract == 3) {
      let verify = this.verifyArrayPersons();
      if(!verify) return false; 

    }

    if (this.idScenario == undefined) {
      const newProperty = this.buildBody();
      this.createProperty(newProperty);
    } else {
      this.buildBodyUpdate();
      this.editProperty();
    }
  }
  editProperty() {
    this.isLoadingSave = true;
    // return console.log(this.baseObjProperty,'baseObjProperty');
    this._scenarios
      .updateLegalProperty(this.baseObjProperty, this.dataChild.id)
      .pipe(finalize(() => (this.isLoadingSave = false)))
      .subscribe(
        (resp: any) => {
          // console.log("property created ", resp);
          this.isLoadingSave = false;

          this._notifier.showNotification("", "success");

          this.saveProperty.emit();
          this.idProperty = resp?.data?.id;
          // console.log("idProperty: ", this.idProperty);

          this.setDetailInfo(resp);
          this.toggleCollapse();
          const currentUrl = this._router.url;
          this._router.routeReuseStrategy.shouldReuseRoute = () => false;
          this._router.onSameUrlNavigation = "reload";
          this._router.navigate([currentUrl]);
          // Agregar cuando sea editar
          //this.isEditing = false;
        },
        (res: any) => {
          // console.log(res);
          const error = res?.error?.errors;
          const errorMessage = error ? error[Object.keys(error)[0]][0] : null;
          const message = res?.error?.message || "";

          this._notifier.showNotification(res, "error");
        }
      );
  }
  createProperty(property) {
    this.isLoadingSave = true;
    this._scenarios
      .createLegalProperty(property)
      .pipe(finalize(() => (this.isLoadingSave = false)))
      .subscribe(
        (resp: any) => {
          // console.log("property created ", resp);
          this.isLoadingSave = false;
          this.configCumulative.delete = true;
          this.configCumulative.edit = true;
          this.configCumulative.visible = true;
          this._notifier.showNotification("", "success");
          this.saveProperty.emit();
          this.setDetailInfo(resp);
          this.isCollapsed = true;
          this.isEditing = false;
          // setTimeout(()=>{
          //   this.isCollapsed = false;
          // },1000)
          // this.isEditing = !this.isEditing
          // Agregar cuando sea editar
          //this.isEditing = false;
        },
        (res: any) => {
          // console.log(res);
          const error = res?.error?.errors;
          const errorMessage = error ? error[Object.keys(error)[0]][0] : null;
          const message = res?.error?.message || "";
          this.isLoadingSave = false;

          this._notifier.showNotification(res, "error");
        }
      );
  }

  delete(value) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.config = this.configDeleteModal;

    modalRef.componentInstance.confirmDelete
      .pipe(
        switchMap((receivedEntry: any) => {
          modalRef.close();
          return this._scenarios.deleteLegalProperty(value);
        })
      )
      .subscribe(
        (resp: any) => {
          this._notifier.showNotification("Operación exitosa", "success");
          this.fetchdataChild.emit(true);
        },
        (err) => {
          this._notifier.showNotification("", "error");
        }
      );
  }

  edit() {
    // this.idScenario == undefined ? this.toggleCollapse() : this.isCollapsed = !this.isCollapsed;
    // this.isCollapsed= false;
    this.isEditing = !this.isEditing;
    if (this.isCollapsed) {
      console.log("this.datachild", this.dataChild);
      if (this.idScenario) {
        if (this.dataChild.tipocontrato.id == 2) this.changeDependence();
      }
      this.isCollapsed = false;
    }

    this.filterScenarioOptions();
    // this.toggleDetail()
  }

  detailVisible() {
    this.isEditing = false;
    if (this.isCollapsed) this.isCollapsed = false;
    this.toggleDetail();
  }
  changeDetailToEdit() {
    this.toggleDetail();
    this.isEditing = true;
  }

  saveTenants(persons) {
    // console.log('arrendatarios', persons)
    this.tenants = persons;
  }

  saveSupervisors(persons) {
    // console.log('supervisor', persons)
    this.supervisors = persons;
  }

  saveBorrowers(persons) {
    // console.log('comodatarios', persons)
    this.borrowers = persons;
  }

  // helpers for View
  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  eventCollapse(event) {
    console.log(event);
    this.isCollapsed = event.isCollapsed;
    this.isEditing = event.isEditing;
    if (this.idScenario) {
      if (this.isEditing && this.dataChild.tipocontrato.id == 2) this.changeDependence();
    }
    this.isDetail = event.isDetail;
  }
}
