import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { blobToFile } from 'src/app/core/services/scenarios.service';
const  apiURL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class InterventionsService {
  apiInterventions = `${apiURL}/intervenciones`;
  constructor(private _http: HttpClient) { }

  getAllInterventions(params, endpoint = null): Observable<any> {
    let httpParams: HttpParams;
    let api = this.apiInterventions;
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

  donwloadExcelInterventions(params) {
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
      .get(`${this.apiInterventions}`, {
        params: httpParams,
        responseType: "blob",
      })
      .subscribe((response) =>
        blobToFile(
          response,
          "application/vnd.ms-excel",
          "Intervenciones.xlsx"
        )
      );
  }
  getIntervention(id){
    return this._http.get(`${this.apiInterventions}/${id}`).pipe(
      retry(2),
      catchError((err) => {
        return throwError(`Error get scenario ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
  updateIntervention(body, id) {
    return this._http.put(`${this.apiInterventions}/${id}`, body).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
  createIntervention(scenario) {
    return this._http.post(`${this.apiInterventions}`, scenario).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
  deleteIntervention(id): Observable<any> {
    return this._http.delete(`${this.apiInterventions}/${id}`).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

}
