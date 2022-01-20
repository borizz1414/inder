import {
  Component,
  OnInit,
} from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
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
  selector: 'app-dashboard-container',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss']
})
export class DashboardContainer implements OnInit {
  dataScenarios: any;
  dataProperty: any;


  //Configuracion de la Card
  configCard1 = {
    title: "Escenarios Deportivos",
    btnName: "Ver todo",
    routerLinkBtn: "/escenarios-planeacion/inicio/lista",
  };
  configCard2 = {
    title: "Diagnósticos",
    btnName: "Ver todo",
    routerLinkBtn: "/escenarios-planeacion/diagnostico/lista",
  };
  configCard3 = {
    title: "Versionamiento",
    btnName: "Ver todo",
    routerLinkBtn: "/escenarios-planeacion/diagnostico/versionamiento",
  };

  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsTableScenarios = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "visualizacion", display: "VISUALIZACIÓN" },
    { name: "actions", display: "ACCIONES" },
  ];
  columnsTableProperty = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "ultima_actualizacion", display: "ULTIMA ACTUALIZACÓN" },
    { name: "actions", display: "ACCIONES" },
  ];
  columnsTableVersioning = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "estado", display: "ESTADO" },
    { name: "actions", display: "ACCIONES" },
  ];
  roles;
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
        actionsLink: "/escenarios/detalle",
      },
    ],
  };
  configDisplayProperty = {
    btnDownloadExcel: false,
    paginator: false,
    actions: [
      {
        action: "view",
        actionsLink: "/escenarios-planeacion/diagnostico/detalle",
      },
    ],
  };
  configDisplayVersioning = {
    btnDownloadExcel: false,
    paginator: false,
    actions: [
      {
        action: "view",
        actionsLink: "/escenarios-planeacion/diagnostico/versionamiento/detalle",
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
  params: Params = {
    numero_registros:10
  };
  endpointParam:string = null;

  isLoading: boolean= false;
  selection = new SelectionModel<Element>(true, []);
  constructor(private _scenarios: ScenariosService) {}
  ngOnInit(): void {
    this.fetchScenarios(this.params);
    this.getAllProperty(this.params)
    this.roles = JSON.parse(localStorage.getItem('user')).roles;
  }

  getAllProperty(params: Object): void {
    this.isLoading = true;
    console.log(params, "params");
    this._scenarios.getLegalProperty(params, this.endpointParam).subscribe(
      (resp: any) => {
        this.dataProperty = resp.data;

        this.isLoading = false;
      },
      (err: any) => (this.isLoading = false)
    );
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
  changeDisplayScenario(event){
    console.log('dashevent',event)
    const paramsObj = {
      visualizacion:event.value
    }
    this._scenarios.updateScenario(paramsObj,event.id).subscribe((resp:any) => {
      console.log('dash',resp)
      this.fetchScenarios(this.params)
    })
  }
}


