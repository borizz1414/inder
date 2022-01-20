import { Component, OnInit } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { GuaranteeService } from "../../services/guarantee.service";
import { ActivatedRoute } from "@angular/router";
import { I } from "@angular/cdk/keycodes";
import * as moment from "moment";

interface Params {
  numero_registros?: number;
  limite_registros?: number;
  nombre?: string;
  barrio?: number;
  visualizacion?: boolean;
  page?: number;
  reporte_excel?: string;
  reporte_ids?: any;
  escenario_id?: any;
}
/**
 * @title Table with selection
 */
@Component({
  selector: "app-guarantees-of-scenario-container",
  templateUrl: "./guarantees-of-scenario.container.html",
  styleUrls: ["./guarantees-of-scenario.container.scss"],
})
export class GuaranteesOfScenarioContainer implements OnInit {
  idScenario: number;
  dataSource: any;
  //Configuracion de la Card
  configCard = {
    title: "Garantías",
    btnName: "Agregar Garantía",
    routerLinkBtn: "",
  };

  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "updated_at", display: "FECHA ACTUALIZACIÓN" },
    { name: "fecha_fin", display: "VENCIMIENTO" },
    { name: "tipo_garantia", display: "TIPO" },
    { name: "dias_faltantes", display: "DÍAS FALTANTES" },
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
        actionsLink: "/garantias/detalle/",
      },
      {
        action: "edit",
        actionsLink: "/garantias/editar/",
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
    numero_registros: 10,
  };
  endpointParam: string = null;

  isLoading: boolean = false;
  selection = new SelectionModel<Element>(true, []);
  constructor(
    private _guarantee: GuaranteeService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.fetch(this.params);
    
  }

  fetch(params: Object): void {
    this.isLoading = true;
    console.log(params, "params");
    this.activatedRoute.params.subscribe((paramId) => {
      this.idScenario = paramId.id;
      if (this.idScenario) {
        this.params.escenario_id = this.idScenario;
        this.configCard.routerLinkBtn = `/garantias/agregar/${this.idScenario}`
      }
    });
    this._guarantee.getAllGuarantee(params, this.endpointParam).subscribe(
      (resp: any) => {
        this.filterData(resp.data);
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
      if(element.tipo_garantia) element.tipo_garantia = element.tipo_garantia.nombre;
      element.updated_at = moment(element.updated_at).format('DD/MM/YYYY')
    })
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
    this.params.numero_registros = event.numero_registros;
    this.endpointParam = event.endpoint;
    if (this.endpointParam == null) console.log(this.params, "params");
    return this.fetch(this.params);
  }

  changeDisplayScenario(event) {
    // const paramsObj = {
    //   visualizacion: event.value,
    // };
    // this._scenarios
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
