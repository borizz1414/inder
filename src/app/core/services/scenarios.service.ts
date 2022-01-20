import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, Output, EventEmitter } from "@angular/core";
import { throwError, Observable } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TableService } from "../../theme/shared/crud-table/services/table.service";

const  apiURL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class ScenariosService {
  // ${apiURL}/escenarioDeportivoJuridico
  @Output() selectOptions: EventEmitter<any> = new EventEmitter();
  apiLegalScenario = `${apiURL}/escenarioDeportivoJuridico`;
  apiLegalProperty = `${apiURL}/bienesInmueblesJuridicos`;
  apiNewScenario = `${apiURL}/escenarioDeportivo`;


  constructor(private _http: HttpClient) {}

  getAllScenarios(params, endpoint = null): Observable<any> {
    let httpParams: HttpParams;
    let api = this.apiNewScenario;
    if (endpoint !== null) api = endpoint;

    if (params.hasOwnProperty("reporte_excel")) {
      httpParams = new HttpParams();
      for (const key of Object.keys(params)) {
        if (params[key]) {
          if (params[key] instanceof Array) {
            params[key].forEach((item) => {
              httpParams = httpParams.append(`${key.toString()}[]`, item);
            });
          } else {
            httpParams = httpParams.append(key, params[key]);
          }
        }
      }
    } else {
      httpParams = params;
    }
    console.log(httpParams,'httpParams');
    return this._http
      .get(`${api}`, { params: httpParams })
      .pipe(
        catchError((err) => {
          return throwError(`Error ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  viewLegalProperty(id) {
    return this._http.get(`${this.apiLegalProperty}/${id}`).pipe(
      catchError((err) => {
        return throwError(`Error ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getOneLegalProperty(params, endpoint = null, id?): Observable<any> {
    let httpParams: HttpParams;
    let api = this.apiLegalProperty;
    if (endpoint !== null) api = endpoint;


    // console.log(this.apiLegalProperty);
    if (params.hasOwnProperty("reporte_excel")) {
      httpParams = new HttpParams();
      for (const key of Object.keys(params)) {
        if (params[key]) {
          if (params[key] instanceof Array) {
            params[key].forEach((item) => {
              httpParams = httpParams.append(`${key.toString()}[]`, item);
            });
          } else {
            httpParams = httpParams.append(key, params[key]);
          }
        }
      }
    } else {
      httpParams = params;
    }
    // console.log(httpParams);
    return this._http
      .get(`${api}`, { params: httpParams })
      .pipe(
        catchError((err) => {
          return throwError(`Error ${err}`);
        }),
        map((resp: any) => {
          // console.log(resp,'resp service')

          return resp;
        })
      );
  }

  getLegalProperty(params, endpoint = null, id?): Observable<any> {
    let httpParams: HttpParams;
    let api = this.apiLegalProperty;

    if (endpoint !== null) api = endpoint;
 

    // console.log(this.apiLegalProperty);
    if (params.hasOwnProperty("reporte_excel")) {
      httpParams = new HttpParams();
      for (const key of Object.keys(params)) {
        if (params[key]) {
          if (params[key] instanceof Array) {
            params[key].forEach((item) => {
              httpParams = httpParams.append(`${key.toString()}[]`, item);
            });
          } else {
            httpParams = httpParams.append(key, params[key]);
          }
        }
      }
    } else {
      httpParams = params;
    }
    // console.log(httpParams);
    return this._http
      .get(`${api}`, { params: httpParams })
      .pipe(
        catchError((err) => {
          return throwError(`Error ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  excelLegalScenario(params) {
    // console.log(params, "paramsss");
    delete params.endpoint;
    let httpParams = new HttpParams();
    for (const key of Object.keys(params)) {
      if (params[key]) {
        if (params[key] instanceof Array) {
          params[key].forEach((item) => {
            httpParams = httpParams.append(`${key.toString()}[]`, item);
          });
        } else {
          httpParams = httpParams.append(key.toString(), params[key]);
        }
      }
    }
    return this._http
      .get(`${this.apiLegalScenario}`, {
        params: httpParams,
        responseType: "blob",
      })
      .subscribe((response) =>
        blobToFile(
          response,
          "application/vnd.ms-excel",
          "Escenarios-Deportivos-Juridicos.xlsx"
        )
      );
  }

  excelLegalProperty(params) {
    // console.log(params, "paramsss");
    delete params.endpoint;
    let httpParams = new HttpParams();
    for (const key of Object.keys(params)) {
      if (params[key]) {
        if (params[key] instanceof Array) {
          params[key].forEach((item) => {
            httpParams = httpParams.append(`${key.toString()}[]`, item);
          });
        } else {
          httpParams = httpParams.append(key.toString(), params[key]);
        }
      }
    }
    return this._http
      .get(`${this.apiLegalProperty}`, {
        params: httpParams,
        responseType: "blob",
      })
      .subscribe((response) =>
        blobToFile(
          response,
          "application/vnd.ms-excel",
          "Bienes-Inmuebles-Juridicos.xlsx"
        )
      );
  }

  downloadFile(params, type = null) {
    let httpParams = new HttpParams();

    for (const key of Object.keys(params)) {
      if (params[key]) {
        httpParams = httpParams.append(key.toString(), params[key]);
      }
    }

    return this._http
      .get(`${apiURL}/downloadFile`, {
        params: httpParams,
        responseType: "blob",
      })
      .subscribe((response) => blobToFile(response, type || "", params.nombre));
  }



  getScenario(id: string): Observable<any> {
    return this._http.get(`${this.apiNewScenario}/${id}`).pipe(
      retry(2),
      catchError((err) => {
        return throwError(`Error get scenario ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  updateScenario(scenario, id) {
    return this._http.put(`${this.apiNewScenario}/${id}`, scenario).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
  
  createScenario(scenario) {
    return this._http.post(`${this.apiNewScenario}`, scenario).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getOfficeOptions(): Observable<any> {
    return this._http.get(`${apiURL}/despacho`).pipe(
      catchError((err) => {
        return throwError(`Error get office options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getMunicipalityOptions(): Observable<any> {
    return this._http.get(`${apiURL}/municipios`).pipe(
      catchError((err) => {
        return throwError(`Error get municipality options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getNeighborhoodOptions(params = null): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      for (const key of Object.keys(params)) {
        httpParams = httpParams.append(key.toString(), params[key]);
      }
    }

    return this._http
      .get(`${apiURL}/barrio`, { params: httpParams })
      .pipe(
        catchError((err) => {
          return throwError(`Error get neighborhood options ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  getTypeEquipmentOptions(): Observable<any> {
    return this._http.get(`${apiURL}/tipoEquipamiento`).pipe(
      catchError((err) => {
        return throwError(`Error get type of equipment options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getScenarioOptions(params): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("select", "selectOption");

    if (params) {
      for (const key of Object.keys(params)) {
        if (params[key]) {
          httpParams = httpParams.append(key.toString(), params[key]);
        }
      }
    }
    return this._http
      .get(`${apiURL}/escenarioDeportivo`, { params: httpParams })
      .pipe(
        catchError((err) => {
          return throwError(`Error get scenario options ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  getTypeContractOptions(): Observable<any> {
    return this._http.get(`${apiURL}/tipoContratoBienInmueble`).pipe(
      catchError((err) => {
        return throwError(`Error get type contract options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getDispositionOptions(): Observable<any> {
    return this._http.get(`${apiURL}/disposicionBienInmueble`).pipe(
      catchError((err) => {
        return throwError(`Error get disposition options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getDependenceOptions(): Observable<any> {
    return this._http.get(`${apiURL}/dependenciaBienInmueble`).pipe(
      catchError((err) => {
        return throwError(`Error get dependence options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getStrategyOptions(dependence): Observable<any> {
    const options = {
      params: new HttpParams().set("dependencia_id", dependence),
    };

    return this._http
      .get(`${apiURL}/estrategiaBienInmueble`, options)
      .pipe(
        catchError((err) => {
          return throwError(`Error get strategy options ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  getTypeIdOptions(): Observable<any> {
    return this._http.get(`${apiURL}/tipoIdentificacion`).pipe(
      catchError((err) => {
        return throwError(`Error get type ID options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getDisciplineOptions(params): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      for (const key of Object.keys(params)) {
        if (params[key]) {
          httpParams = httpParams.append(key.toString(), params[key]);
        }
      }
    }
    
    return this._http.get(`${apiURL}/disciplina`, { params: httpParams })
    .pipe(
      catchError((err) => {
        return throwError(`Error get discipline options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getReservationsOptions(params): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      for (const key of Object.keys(params)) {
        if (params[key]) {
          httpParams = httpParams.append(key.toString(), params[key]);
        }
      }
    }
    
    return this._http.get(`${apiURL}/tipoReserva`, { params: httpParams })
    .pipe(
      catchError((err) => {
        return throwError(`Error get reservations options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getTrendsOptions(params): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      for (const key of Object.keys(params)) {
        if (params[key]) {
          httpParams = httpParams.append(key.toString(), params[key]);
        }
      }
    }
    
    return this._http.get(`${apiURL}/tendencias`, { params: httpParams })
    .pipe(
      catchError((err) => {
        return throwError(`Error get trends options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getDivisionCategoryOptions(): Observable<any> {
    return this._http.get(`${apiURL}/categoriaDivision`).pipe(
      catchError((err) => {
        return throwError(`Error get division category options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  createLegalProperty(property) {
    return this._http
      .post(`${this.apiLegalProperty}`, property)
      .pipe(
        catchError(err => {
          return throwError(err.error.errors);
      }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  updateLegalProperty(property, idProperty) {
    // console.log("property in services ", property);

    return this._http
      .put(`${this.apiLegalProperty}/${idProperty}`, property)
      .pipe(
        catchError((err) => {
          return throwError(err.error.errors);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  deleteLegalProperty(id): Observable<any> {
    return this._http.delete(`${this.apiLegalProperty}/${id}`).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
}
//PASAR A UTILS ///////////
export const blobToFile = (data: any, type: string = "", fileName: string) => {
  // console.log(data);

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";

  const blob = type ? new Blob([data], { type: type }) : new Blob([data]);
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = fileName;
  a.click();

  window.URL.revokeObjectURL(url);
}
