import { Component, OnInit } from '@angular/core';
import { SelectionModel } from "@angular/cdk/collections";

import { ScenariosService } from "src/app/core/services/scenarios.service";

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
  selector: 'app-list-scenarios-container',
  templateUrl: './list-scenarios.container.html',
  styleUrls: ['./list-scenarios.container.scss']
})
export class ListScenariosContainer implements OnInit {
  dataSource;
  //Configuracion de la Card
  configCard = {
    title: "Escenarios Deportivos",
    btnName: "Agregar Escenario Deportivo",
    routerLinkBtn: "/escenarios-planeacion/inicio/agregar",
  };
   // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "versionamiento", display: "VERSIONAMIENTO" },
    { name: 'fecha_actualizacion', display: 'ÚLTIMA ACTUALIZACIÓN' },
    { name: "visualizacion", display: "VISUALIZACIÓN" },
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
        actionsLink: "/escenarios-planeacion/inicio/detalle",
      },
      {
        action: "edit",
        actionsLink: "/escenarios-planeacion/inicio/editar",
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
  rol = null;

  constructor(private _scenarios: ScenariosService) {
    // Obteniendo rol para diferenciar las rutas
    this.rol = JSON.parse(localStorage.getItem('user'))?.roles;
    console.log('rol', this.rol);
  }

  ngOnInit(): void {
    if (this.rol === 'subdireccion'){
      this.configCard.routerLinkBtn = "/escenarios-subdireccion/agregar";
      this.configDisplayElement.actions[0].actionsLink = "/escenarios-subdireccion/detalle";
      this.configDisplayElement.actions[1].actionsLink = "/escenarios-subdireccion/editar";
    }
    
    this.params.numero_registros = this.configPaginator.pageSize[0]
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

  getEventFilter(event) {
    console.log("event", event);

    this.params = event;
    if (event.type == "nombre") {
      this.params = {
        nombre: event.value,
      };
    }
   
    return this.fetch(this.params);
  }

  fetchPaginator(event) {
    console.log("event", event);

    this.params.numero_registros = event.numero_registros;
    this.endpointParam = event.endpoint;
    if (this.endpointParam == null) console.log(this.params, "params");

    return this.fetch(this.params);
  }

  changeDisplayScenario(event) {
    console.log("event", event);

    const paramsObj = {
      visualizacion: event.value,
    };
    this._scenarios.updateScenario(paramsObj, event.id)
      .subscribe((resp: any) => {
        console.log('visualizacion', resp);
        this.fetch(this.params);
      });
  }

  reportExcel(event) {
    console.log("event", event);
    this.params.reporte_excel = "reporte_excel";
    this.params.reporte_ids = [event];
    this._scenarios.excelLegalScenario(this.params);
  }
}
