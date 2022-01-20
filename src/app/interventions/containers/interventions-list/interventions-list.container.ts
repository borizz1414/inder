
import {
  Component,
  OnInit,
} from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
// import { GuaranteeService } from '../../services/guarantee.service';
import { InterventionsService } from '../../services/interventions.service';
import { ScenariosService } from '../../../core/services/scenarios.service';

interface Params {
  numero_registros?: number;
  limite_registros?: number;
  nombre?: string;
  barrio?: number;
  visualizacion?: boolean;
  page?: number;
  reporte_excel?: string;
  reporte_ids?: any;
  comuna?: any;
  nombre_escenario?:any;
}
/**
 * @title Table with selection
 */
 @Component({
  selector: 'app-interventions-list-container',
  templateUrl: './interventions-list.container.html',
  styleUrls: ['./interventions-list.container.scss']
})
export class InterventionsListContainer implements OnInit {

  dataSource: any;
  //Configuracion de la Card
  configCard = {
    title: "Intervenciones",
    btnName: "Agregar Intervención",
    routerLinkBtn: "/intervenciones/agregar",
  };

  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "escenario_deportivo", display: "NOMBRE" },
    { name: "descripcion", display: "DESCRIPCIÓN" },
    { name: "fecha_priorizacion_inicio", display: "FECHA INICIO / FIN" },
    { name: "estado", display: "ESTADO" },
    { name: "nombre_acta_cantidades_finales", display: "ACTA DE CANTIDADES" },
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
        actionsLink: "/intervenciones/detalle/",
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
  constructor(private _interventions: InterventionsService,
              private _scenarios: ScenariosService) {}
  ngOnInit(): void {
    this.fetch(this.params);
  }

  fetch(params: Object): void {
    this.isLoading = true;
    console.log(params, "params");
    this._interventions.getAllInterventions(params, this.endpointParam).subscribe(
      (resp: any) => {
        console.log(resp)
        this.filterData(resp.data);
        this.dataSource = resp.data;
        this.configPaginator.total = resp.meta.total;
        this.configPaginator.page = resp.meta.current_page;
        this.configPaginator.path = resp.meta.path;
        this.isLoading = false;
      },
      (err: any) => (this.isLoading = false)
    );
  }
  filterData(data){
    console.log(data, 'filerData')
    this.dataSource = data;
    return data.filter((element)=>{
      if(element.escenario_deportivo) element.escenario_deportivo = element.escenario_deportivo.nombre;
      element.fecha_priorizacion_inicio = `${element.fecha_priorizacion_inicio} a ${element.fecha_priorizacion_fin}`
    })
  }
  getEventFilter(event) {
    console.log(event, 'eventFilter');
    this.params = event;
    if (event.type == "escenario") {
      this.params = {
        nombre_escenario: event.value,
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
    // const paramsObj = {
    //   visualizacion: event.value,
    // };
    // this._interventions
    //   .updateScenario(paramsObj, event.id)
    //   .subscribe((resp: any) => {
    //     console.log(resp);
    //     this.fetch(this.params);
    //   });
  }
  downloadReq(params) {
    this._interventions.donwloadExcelInterventions(params);
  }
  reportExcel(event) {
    this.params.reporte_excel = "reporte_excel";
    this.params.reporte_ids = [event];
    this.downloadReq(this.params);
  }
  downloadFile(paramsChild){
    console.log(paramsChild)
    // params ={
      // url,
      // name
    // }
    this._scenarios.downloadFile(paramsChild);
  }
}

