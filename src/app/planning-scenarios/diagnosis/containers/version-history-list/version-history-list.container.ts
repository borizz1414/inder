import { Component, OnInit } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { ScenariosService } from "../../../../core/services/scenarios.service";
import { Location } from "@angular/common";

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
/**
 * @title Table with selection
 */
@Component({
  selector: "app-version-history-list-container",
  templateUrl: "./version-history-list.container.html",
  styleUrls: ["./version-history-list.container.scss"],
})
export class VersionHistoryListContainer implements OnInit {
  dataSource: any;
  //Configuracion de la Card
  configCard = {
    title: "Historial de Diagnosticos - Cancha Polideportiva la Polvoreda",
    btnName: "",
    routerLinkBtn: "",
  };

  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "versionamiento", display: "VERSIONAMIENTO" },
    { name: "calificacion", display: "CALIFICACIÓN" },
    { name: "ultima_actualizacion", display: "ÚLTIMA ACTUALIZACIÓN" },
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
        actionsLink: "/escenarios-planeacion/diagnostico/detalle",
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
  isSidewalk: boolean = false;
  params: Params = {
    numero_registros:10
  };
  endpointParam: string = null;

  isLoading: boolean = false;
  selection = new SelectionModel<Element>(true, []);
  constructor(private _scenarios: ScenariosService, private _location: Location) {}
  ngOnInit(): void {
    this.fetch(this.params);
  }

  fetch(params: Object): void {
    this.isLoading = true;
    console.log(params, "params");
    this._scenarios.getAllScenarios(params, this.endpointParam).subscribe(
      (resp: any) => {
        this.dataSource = resp.data;
        this.configPaginator.total = resp.meta.total;
        this.configPaginator.page = resp.meta.current_page;
        this.configPaginator.path = resp.meta.path;
        this.isLoading = false;
      },
      (err: any) => (this.isLoading = false)
    );
  }
  goBack() {
    this._location.back();
  }
  getEventFilter(event) {
    console.log(event);
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
  updateDisplay() {}
  fetchPaginator(event) {
    console.log("event", event);
    this.params = event.numero_registros;
    this.endpointParam = event.endpoint;
    if (this.endpointParam == null) console.log(this.params, "params");
    return this.fetch(this.params);
  }

  changeDisplayScenario(event) {
    const paramsObj = {
      visualizacion: event.value,
    };
    this._scenarios
      .updateScenario(paramsObj, event.id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.fetch(this.params);
      });
  }
  downloadReq(params) {
    this._scenarios.excelLegalScenario(params);
  }
  reportExcel(event) {
    this.params.reporte_excel = "reporte_excel";
    this.params.reporte_ids = [event];
    this.downloadReq(this.params);
  }
}
