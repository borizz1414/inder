import { Component, OnInit } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { ScenariosService } from "../../../../core/services/scenarios.service";

interface Params {
  numero_registros?: number;
  limite_registros?: number;
  nombre?: string;
  barrio?: number;
  visualizacion?: boolean;
  page?: number;
  reporte_excel?: string;
  reporte_ids?: any;
  eliminarTodos?: string,
  escenarioid?: number,
}
/**
 * @title Table with selection
 */
@Component({
  selector: "app-list-property-container",
  templateUrl: "./list-property.container.html",
  styleUrls: ["./list-property.container.scss"],
})
export class ListPropertyContainer implements OnInit {
  dataSource: any;

  //Configuracion de la Card
  configCard = {
    title: "Bienes Inmuebles",
    btnName: "Agregar Bien Inmueble",
    routerLinkBtn: "/escenarios/bienes-inmuebles/agregar",
  };

  // Columnas de la tabla
  // El campo name debe ser igual a los campos que vienen en la data
  columnsNamesToDisplay = [
    { name: "select", display: "" },
    { name: "nombre", display: "NOMBRE" },
    { name: "bienesjuridicos_count", display: "BIENES INMUEBLES" },
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
        actionsLink: "/escenarios/bienes-inmuebles/editar",
      },
      {
        action: "trash",
        actionsLink: "",
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
  // Configuración de modal de confirmación de eliminación
  configDeleteModal = {
    title: "¿Seguro de Eliminar todos los bienes inmuebles?",
    bodyText: "",
  };
  params: Params = {};
  endpointParam: string = null;

  isLoading: boolean = false;
  selection = new SelectionModel<Element>(true, []);
  constructor(private _scenarios: ScenariosService) {}
  ngOnInit(): void {
    this.getAllProperty(this.params);
  }

  getAllProperty(params: Object): void {
    this.isLoading = true;
    console.log(params, "params");
    this._scenarios.getLegalProperty(params, this.endpointParam).subscribe(
      (resp: any) => {
        if(resp.data && resp.meta){
          console.log('data property',resp)
          this.dataSource = resp.data;
          this.configPaginator.total = resp.meta.total;
          this.configPaginator.page = resp.meta.current_page;
          this.configPaginator.path = resp.meta.path;
          this.isLoading = false;
        }
        if(resp.message){
          this.isLoading = false;
          this.params = {};
          this.getAllProperty(this.params);
        }
      },
      (err: any) => (this.isLoading = false)
    );
  }
  getEventFilter(event) {
    console.log(event, 'event');
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
    return this.getAllProperty(this.params);
  }

  fetchPaginator(event) {
    console.log("event", event);
    this.params = event.numero_registros;
    this.endpointParam = event.endpoint;
    if (this.endpointParam == null) console.log(this.params, "params");
    return this.getAllProperty(this.params);
  }
  deletePropertys(event){
    console.log(event)
    this.params = {
      eliminarTodos: 'BienesInmueblesJuridicos',
      escenarioid: event,
    };
    return this.getAllProperty(this.params);
  }
  changeDisplayScenario(event) {
    const paramsObj = {
      visualizacion: event.value,
    };
    this._scenarios
      .updateScenario(paramsObj, event.id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.getAllProperty(this.params);
      });
  }
  downloadReq(params) {
    this._scenarios.excelLegalProperty(params);
  }
  reportExcel(event) {
    this.params.reporte_excel = "reporte_excel";
    this.params.reporte_ids = [event];
    this.downloadReq(this.params);
  }
}
