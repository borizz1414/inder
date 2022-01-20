
import {
  Component,
  OnInit,
} from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { GuaranteeService } from '../../services/guarantee.service';

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
}
/**
 * @title Table with selection
 */
 @Component({
  selector: 'app-guarantee-list-container',
  templateUrl: './guarantee-list.container.html',
  styleUrls: ['./guarantee-list.container.scss']
})
export class GuaranteeListContainer implements OnInit {
  dataSource: any;
  //Configuracion de la Card
  configCard = {
    title: "Garantías",
    btnName: "Agregar Garantía",
    routerLinkBtn: "/garantias/agregar",
  };

  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "garantias_count", display: "GARANTÍAS" },
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
        actionsLink: "/garantias/ver/",
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
  constructor(private _guarantee: GuaranteeService) {}
  ngOnInit(): void {
    this.fetch(this.params);
  }

  fetch(params: Object): void {
    this.isLoading = true;
    console.log(params, "params");
    this._guarantee.getAllGuarantee(params, this.endpointParam).subscribe(
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
    console.log(event);
    this.params = event;
    if (event.type == "escenario") {
      this.params = {
        nombre: event.value,
      };
    }
    if (event.type == "comuna") {
      this.params = {
        comuna: event.value,
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
    // this._guarantee
    //   .updateScenario(paramsObj, event.id)
    //   .subscribe((resp: any) => {
    //     console.log(resp);
    //     this.fetch(this.params);
    //   });
  }
  downloadReq(params) {
    this._guarantee.donwloadExcelGuarantee(params);
  }
  reportExcel(event) {
    this.params.reporte_excel = "reporte_excel";
    this.params.reporte_ids = [event];
    this.downloadReq(this.params);
  }
}
