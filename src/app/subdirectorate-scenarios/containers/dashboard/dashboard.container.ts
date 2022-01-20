import { Component, OnInit } from '@angular/core';
import { ScenariosService } from "src/app/core/services/scenarios.service";

interface Params{
  numero_registros?: number;
  limite_registros?:number;
  nombre?: string;
  barrio?: number;
  visualizacion?:boolean;
  page?:number;
  endpoint?:string;
  reporte_excel?:string;
  reporte_ids?: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss']
})
export class DashboardContainer implements OnInit {

  dataScenarios: any;
  dataProperty: any = [];

  //Configuracion de la Card
  configCard1 = {
    title: "Escenarios Deportivos",
    btnName: "Ver todo",
    routerLinkBtn: "/escenarios-subdireccion/lista",
  };
  configCard2 = {
    title: "Diagnósticos",
    btnName: "Ver todo",
    routerLinkBtn: "/escenarios-subdireccion/diagnostico",
  };

  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsTableScenarios = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "visualizacion", display: "VISUALIZACIÓN" },
    { name: "actions", display: "ACCIONES" },
  ];
  columnsTableDiagnosis = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "ultima_actualizacion", display: "ULTIMA ACTUALIZACÓN" },
    { name: "actions", display: "ACCIONES" },
  ];

  // Configuracion de los elementos de la tabla
  // Boton de Excel = btnDownloadExcel
  // Paginador = paginator
  // Acciones = actions
  configDisplayScenarios= {
    btnDownloadExcel: false,
    paginator: false,
    actions: [
      {
        action: "view",
        actionsLink: "/escenarios-subdireccion/detalle",
      },
    ],
  };
  configDisplayDiagnosis = {
    btnDownloadExcel: false,
    paginator: false,
    actions: [
      {
        action: "view",
        actionsLink: "/escenarios-subdireccion/diagnostico/detalle",
      },
    ],
  };

  configPaginator={
    page : '',
    pageSize :[10],
    total :'',
    pageSizes:  [10,50,100],
    path:''
  }
  params: Params={
    numero_registros:10
  }
  endpointParam:string = null;
  isLoading: boolean= false;

  constructor(private _scenarios: ScenariosService) { }

  ngOnInit(): void {
    this.params.numero_registros = this.configPaginator.pageSize[0];
    this.fetchScenarios(this.params);
  }

  fetchScenarios(params: Object): void {
    this.isLoading = true;
    this._scenarios.getAllScenarios(params, this.params.endpoint).subscribe(
      (resp: any) => {
        this.dataScenarios = resp.data;

        this.isLoading = false;
      },
      (err: any) =>  (this.isLoading = false, console.log(err)));
  }

  fetchDiagnosis(params: Object): void{

  }
  
  changeDisplayScenario(event){
    console.log('evento vizualización',event)
    const paramsObj = {
      visualizacion: event.value
    }
    this._scenarios.updateScenario(paramsObj,event.id).subscribe(
      (resp:any) => {
        console.log('response scenarios dash',resp)
        this.fetchScenarios(this.params)
      }
    )
  }

}
