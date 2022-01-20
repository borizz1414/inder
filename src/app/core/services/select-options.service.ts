import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
const  apiURL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class SelectOptionsService {

  constructor(private _http: HttpClient) { }

  getFundingSource(): Observable<any>{
    return this._http.get(`${apiURL}/fuenteFinanciacion`).pipe(
      catchError((err) => {
        return throwError(`Error get fuenteFinanciacion options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
  getTypeGuarantee(): Observable<any>{
    return this._http.get(`${apiURL}/tipoGarantia`).pipe(
      catchError((err) => {
        return throwError(`Error get tipoGarantia options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }
  getTypeAddress(): Observable<any>{
    return this._http.get(`${apiURL}/tipoDireccion`).pipe(
      catchError((err) => {
        return throwError(`Error get tipoDireccion options ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

}
