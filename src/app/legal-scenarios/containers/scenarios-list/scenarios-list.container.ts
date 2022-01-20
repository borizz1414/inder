import {
  Component,
  OnInit,
} from "@angular/core";
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
/**
 * @title Table with selection
 */
@Component({
  selector: "app-scenarios-list-container",
  templateUrl: "./scenarios-list.container.html",
  styleUrls: ["./scenarios-list.container.scss"],
})
export class ListScenariosContainer implements OnInit {
  dataSource: any;
  //Configuracion de la Card
  configCard = {
    title: "Escenarios Deportivos",
    btnName: "Agregar Escenario Deportivo",
    routerLinkBtn: "/escenarios/agregar",
  };

  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
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
        actionsLink: "/escenarios/detalle",
      },
      {
        action: "edit",
        actionsLink: "/escenarios/editar",
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
  constructor(private _scenarios: ScenariosService) {}
  ngOnInit(): void {
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
    console.log(event,'event');
    // this.params = event;
    if(event == 'reset') {
      return this.resetFilter()
    }else if (event.type == "nombre") {
      this.params.nombre=event.value;
      
    }else {
      this.params= event;  
    }
    return this.fetch(this.params);
  }
  resetFilter() {
    this.params = {numero_registros:this.params.numero_registros}
    return this.fetch(this.params);
  }
  fetchPaginator(event) {
    // console.log("event", event);
    this.params.numero_registros = event.numero_registros;
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
