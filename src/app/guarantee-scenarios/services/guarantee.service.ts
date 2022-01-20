import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { blobToFile } from 'src/app/core/services/scenarios.service';
const  apiURL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class GuaranteeService {

  constructor(private _http: HttpClient) { }
   apiGuarantee = `${apiURL}/garantias`;
  getAllGuarantee(params, endpoint = null): Observable<any> {
    let httpParams: HttpParams;
  
    if (endpoint !== null) this.apiGuarantee = endpoint;

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
      .get(`${this.apiGuarantee}`, { params: httpParams })
      .pipe(
        catchError((err) => {
          return throwError(`Error ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }
  
  
  donwloadExcelGuarantee(params) {
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
      .get(`${this.apiGuarantee}`, {
        params: httpParams,
        responseType: "blob",
      })
      .subscribe((response) =>
        blobToFile(
          response,
          "application/vnd.ms-excel",
          "Garantias.xlsx"
        )
      );
  }
  deleteGuarantee(id): Observable<any> {
    return this._http.delete(`${this.apiGuarantee}/${id}`).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
  getGuarantee(id: string): Observable<any> {
    return this._http.get(`${this.apiGuarantee}/${id}`).pipe(
      retry(2),
      catchError((err) => {
        return throwError(`Error get scenario ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
  updateGuarantee(scenario, id) {
    return this._http.put(`${this.apiGuarantee}/${id}`, scenario).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
  createGuarantee(scenario) {
    return this._http.post(`${this.apiGuarantee}`, scenario).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
}
