import { Component, OnInit } from '@angular/core';

import { MaintenanceService } from 'src/app/maintenance/services/maintenance.service';

interface Params {
  nombre?: string;
  comuna?: number;
  numero_registros?: number;
  limite_registros?: number;
  page?: number;
  reporte_excel?: string;
  reporte_ids?: any;
}

@Component({
  selector: 'app-list-maintenance',
  templateUrl: './list-maintenance.container.html',
  styleUrls: ['./list-maintenance.container.scss']
})
export class ListMaintenanceContainer implements OnInit {

  dataSource;
  //Configuracion de la Card
  configCard = {
    title: "Mantenimientos Programados",
    btnName: "Agregar Mantenimiento",
    routerLinkBtn: "/mantenimientos/agregar",
  };
    // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "mantenimientos_count", display: "MANTENIMIENTOS" },
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
        actionsLink: "/mantenimientos/lista",
      },
    ],
  };
  // Configuración de la paginación
  configPaginator = {
    page: "",
    pageSize: [10],
    total: "",
    pageSizes: [10, 50, 100],
    path: "",
  };
  isLoading: boolean = false;
  params: Params = {};
  endpointParam: string = null;

  constructor(private _maintenance: MaintenanceService) { }

  ngOnInit(): void {
    console.log('initial params', this.params);
    
    this.fetch(this.params);
  }

  fetch(params: Object): void {
    this.isLoading = true;
    this.dataSource = undefined;
    console.log('params', params);

    this._maintenance.getAllMaintenances(params, this.endpointParam).subscribe(
      (resp: any) => {
        this.dataSource = resp.data;
        this.configPaginator.total = resp.meta.total;
        this.configPaginator.page = resp.meta.current_page;
        this.configPaginator.path = resp.meta.path;
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false
        this.dataSource = []
      }
    );
  }

  getEventFilter(event) {
    console.log('event filter', event);
    this.params = event;
    return this.fetch(this.params);
  }

  fetchPaginator(event) {
    console.log("event paginator", event);
    this.params.numero_registros = event.numero_registros;
    this.endpointParam = event.endpoint;
    console.log('endpoint', this.endpointParam);

    return this.fetch(this.params);
  }

  reportExcel(event) {
    console.log("event report", event);

    const reportParams = {
      reporte_excel: "reporte_excel",
      reporte_ids: event,
    }

    console.log('report params', reportParams);
    this._maintenance.donwloadExcelMaintenance(reportParams);
  }
}
