import { Component, OnInit } from '@angular/core';
import { SelectionModel } from "@angular/cdk/collections";

import { ScenariosService } from "../../../../core/services/scenarios.service";

interface Params {
  numero_registros?: number;
  limite_registros?: number;
  nombre?: string;
  barrio?: number;
  visualizacion?: boolean;
  page?: number;
  reporte_excel?: string;
  reporte_ids?: any;
}

@Component({
  selector: 'app-list-diagnosis',
  templateUrl: './list-diagnosis.container.html',
  styleUrls: ['./list-diagnosis.container.scss']
})
export class ListDiagnosisContainer implements OnInit {
  dataSource: any = [];
  //Configuracion de la Card
  configCard = {
    title: "Diagnósticos",
    btnName: "Crear Diagnostico",
    routerLinkBtn: "/escenarios-subdireccion/diagnostico/agregar",
  };
  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "nombre_escenario", display: "NOMBRE" },
    { name: "descripcion", display: "DESCRIPCIÓN" },
    { name: 'fecha_actualizacion', display: 'FECHA DE ACTUALIZACIÓN' },
    { name: "estado", display: "ESTADO" },
    { name: "actions", display: "ACCIONES" },
  ];
  // Configuracion de los elementos de la tabla
  // Boton de Excel = btnDownloadExcel
  // Paginador = paginator
  // Acciones = actions
  configDisplayElement = {
    btnDownloadExcel: true,
    paginator: true,
    actions: [
      {
        action: "view",
        actionsLink: "/escenarios-subdireccion/diagnostico/detalle",
      },
      {
        action: "edit",
        actionsLink: "/escenarios-subdireccion/diagnostico/editar",
      },
    ],
  };
  configPaginator = {
    page: "",
    pageSize: [10],
    total: "",
    pageSizes: [10, 50, 100],
    path: "",
  };
  params: Params = {};
  endpointParam: string = null;
  isLoading: boolean = false;
  selection = new SelectionModel<Element>(true, []);

  constructor(private _scenarios: ScenariosService) { }

  ngOnInit(): void {
    this.fetch(this.params);
  }

  fetch(params: Object): void {
    this.isLoading = true;
    console.log(params, "params");

    /*this._scenarios.getAllScenarios(params, this.endpointParam).subscribe(
      (resp: any) => {
        if(resp){
          this.dataSource = resp.data;
          this.configPaginator.total = resp.meta.total;
          this.configPaginator.page = resp.meta.current_page;
          this.configPaginator.path = resp.meta.path;
        }
        this.isLoading = false;
      },
      (err: any) => (this.isLoading = false)
    );*/

    this.isLoading = false;
  }

  getEventFilter(event) {
    console.log("event", event);

    this.params = event;
    if (event.type == "nombre") {
      this.params = {
        nombre: event.value,
      };
    }
    if (event.type == "barrio") {
      this.params = {
        barrio: event.value,
      };
    }
    return this.fetch(this.params);
  }

  fetchPaginator(event) {
    console.log("event", event);

    this.params = event.numero_registros;
    this.endpointParam = event.endpoint;
    if (this.endpointParam == null) console.log(this.params, "params");
    return this.fetch(this.params);
  }

  changeDisplayScenario(event) {
    console.log("event", event);

    const paramsObj = {
      visualizacion: event.value,
    };
    /*this._scenarios
      .updateScenario(paramsObj, event.id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.fetch(this.params);
      });*/
  }

  reportExcel(event) {
    console.log("event", event);
    this.params.reporte_excel = "reporte_excel";
    this.params.reporte_ids = [event];
    /*this._scenarios.excelLegalScenario(this.params);*/
  }
}
