import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { CorrectiveMaintenanceService } from 'src/app/corrective-maintenance/services/corrective-maintenance.service'

interface Params {
  nombre_escenario?: string;
  fecha?: string;
  estado?: number;
  numero_registros?: number;
  limite_registros?: number;
  page?: number;
  reporte_excel?: string;
  reporte_ids?: any;
}
@Component({
  selector: 'app-list-corrective-maintenance',
  templateUrl: './list-corrective-maintenance.container.html',
  styleUrls: ['./list-corrective-maintenance.container.scss']
})
export class ListCorrectiveMaintenanceContainer implements OnInit {

  dataSource;

  //Configuracion de la Card
  configCard = {
    title: "Mantenimientos Correctivos",
    btnName: "Agregar Mantenimiento",
    routerLinkBtn: "/mantenimientos-correctivos/cuadrilla/agregar",
  };
  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "descripcion", display: "DESCRIPCIÓN" },
    { name: "fecha", display: "FECHA" },
    { name: "estado_correctivo_cuadrilla", display: "ESTADO" },
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
        actionsLink: "/mantenimientos-correctivos/cuadrilla/detalle",
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

  constructor(private _maintenance: CorrectiveMaintenanceService) { }

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
        console.log('data table', resp.data);

        this.dataSource = resp.data.length ? resp.data.map(element => ({
          id: element.id,
          nombre: element?.escenario_deportivo?.nombre,
          descripcion: element?.descripcion,
          fecha: element?.updated_at ? moment(element.updated_at).format("YYYY-MM-DD") : '',
          estado_correctivo_cuadrilla: element?.estado?.nombre,
        })) : []

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
