import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private _http: HttpClient) {}

  // viewFile(filename){
  //   return this._http
  //   .get(`${this.apiLegalScenario}`, { params: httpParams })
  //   .pipe(
  //     catchError((err) => {
  //       return throwError(`Error ${err}`);
  //     }),
  //     map((resp: any) => {
  //       return resp;
  //     })
  //   );

  // }
}
