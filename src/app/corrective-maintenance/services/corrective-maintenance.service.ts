import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { blobToFile } from 'src/app/core/services/scenarios.service';

const  apiURL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class CorrectiveMaintenanceService {
  apiMaintenance = `${apiURL}/mantenimientoCorrectivo`;

  constructor(private _http: HttpClient) { }


  getAllMaintenances(params, endpoint = null): Observable<any>{
    let httpParams: HttpParams;
    let api = this.apiMaintenance;
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
    
    return this._http.get(`${api}`, { params: httpParams })
      .pipe(
        catchError((err) => {
          return throwError(`Error get corrective maintenances ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  donwloadExcelMaintenance(params){
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
    return this._http.get(`${this.apiMaintenance}`, {
        params: httpParams,
        responseType: "blob",
      })
      .subscribe((response) =>
        blobToFile(
          response,
          "application/vnd.ms-excel",
          "Mantenimientos-Correctivos.xlsx"
        )
      );

  }

  createMaintenance(body) {
    return this._http.post(`${this.apiMaintenance}`, body).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  updateMaintenance(body, id) {
    return this._http.put(`${this.apiMaintenance}/${id}`, body).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  updateMaintenanceState(body, id){
    return this._http.put(`${this.apiMaintenance}/${id}`, body).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getMaintenance(id: string): Observable<any> {
    return this._http.get(`${this.apiMaintenance}/${id}`).pipe(
      catchError((err) => {
        return throwError(`Error get maintenance ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  deleteMaintenance(id): Observable<any> {
    return this._http.delete(`${this.apiMaintenance}/${id}`).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getPriorityOptions(): Observable<any>{
    return this._http.get(`${apiURL}/prioridadMantenimientosCorrectivos`)
      .pipe(
        catchError((err) => {
          return throwError(`Error maintenance priority options ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  getTypeMaintenanceOptions(): Observable<any>{
    return this._http.get(`${apiURL}/tipoMantenimiento`)
      .pipe(
        catchError((err) => {
          return throwError(`Error type maintenance options ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  getStateOptions(): Observable<any>{
    return this._http.get(`${apiURL}/estadosMantenimientoCorrectivo`)
      .pipe(
        catchError((err) => {
          return throwError(`Error maintenance state options ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

}
