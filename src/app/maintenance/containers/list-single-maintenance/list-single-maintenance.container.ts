import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import * as moment from 'moment';

import { MaintenanceService } from 'src/app/maintenance/services/maintenance.service';

interface Params {
  mantenimiento_estado?: number;
  mantenimiento_actualizacion?: string;
  numero_registros?: number;
  limite_registros?: number;
  page?: number;
  reporte_excel?: string;
  reporte_ids?: any;
  escenario_id?: number;
}

@Component({
  selector: 'app-list-single-maintenance',
  templateUrl: './list-single-maintenance.container.html',
  styleUrls: ['./list-single-maintenance.container.scss']
})
export class ListSingleMaintenanceContainer implements OnInit {

  dataSource;
  id: any = '';
  scenarioName: string = '';
  //Configuracion de la Card
  configCard = {
    title: `Mantenimientos - `,
    btnName: "Agregar Mantenimiento",
    //routerLinkBtn: "/mantenimientos/agregar",
    routerLinkBtn: "/mantenimientos/editar/",
  };
  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "estado", display: "ESTADO" },
    { name: "fecha_actualizacion", display: "FECHA DE ACTUALIZACIÓN" },
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
        actionsLink: "/mantenimientos/detalle",
      },
      {
        action: "edit",
        actionsLink: "/mantenimientos/editar",
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
  isLoading: boolean = false;
  params: Params = {};
  endpointParam: string = null;

  constructor( 
    private _maintenance: MaintenanceService,
    private activeRoute : ActivatedRoute,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      this.id = params?.id;
      console.log('id', this.id);

      this.configDisplayElement.actions[1].actionsLink = `/mantenimientos/editar/${this.id}`
      this.configCard.routerLinkBtn = `/mantenimientos/editar/${this.id}/${0}`

      this.params.escenario_id = this.id;
      this.fetch(this.params);
    });
  }

  fetch(params: Object): void {
    this.isLoading = true;
    this.dataSource = undefined;
    console.log('params', params);

    this._maintenance.getAllMaintenances(params, this.endpointParam).subscribe(
      (resp: any) => {
        console.log('mantenimientos list', resp.data);

        const dataMap = resp.data.length ? resp.data.map((element, index) => ({
          id: element.id,
          nombre: `Mantenimiento ${index+1}`,
          estado: element?.estado_mantenimiento?.nombre === 'Activo' ? true : false,
          fecha_actualizacion: element?.updated_at ? moment(element.updated_at).format("YYYY-MM-DD") : '',
        })) : []
        this.dataSource = dataMap;
        this.configPaginator.total = resp.meta.total;
        this.configPaginator.page = resp.meta.current_page;
        this.configPaginator.path = resp.meta.path;
        this.isLoading = false;

        if(resp.data.length && !this.scenarioName){
          this.scenarioName = resp.data[0].escenario_deportivo.nombre
          this.configCard.title = `Mantenimientos - ${this.scenarioName}`;
        }
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

  changeDisplayState(event) {
    console.log('event change state', event);

    let body: any = {
      "estado": event.value === "true" ? 1 : 2,
      "actualizar_estado": event.value,
      "nombre_escenario": this.id,
    }
    
    this._maintenance.updateMaintenanceState(body, event.id)
      .subscribe((resp: any) => {
        console.log('updated state', resp);
        this.fetch(this.params);
      });
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

  goBack(){
    this._location.back()
  }

}
