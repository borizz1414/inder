import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _auth: AuthService) { }
  
  // getUser(id): Observable<any>{
  //   const params = new HttpParams(id)
  //   console.log(id)
  //   return this._http.get(`${this._auth.getApiURL}/user/${id}`).pipe(
  //     catchError((err) => {
  //       return throwError(`Error ${err}`);
  //     }),
  //     map((resp: any) => {
  //       return resp;
  //     })
  //   );
  // }

  getUser(): Observable<any>{

    return this._http.get(`${this._auth.getApiURL}/auth/user`).pipe(
      catchError((err) => {
        return throwError(`Error ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  updateUser(id, body): Observable<any>{
    return this._http.put(`${this._auth.getApiURL}/user/${id}`,body).pipe(
      catchError((err) => {
        return throwError(`Error ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getEtniaOptions(): Observable<any>{
    return this._http.get(`${this._auth.getApiURL}/etnias`).pipe(
      catchError((err) => {
        return throwError(`Error get etnias ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getSexualOrientationOptions(): Observable<any>{
    return this._http.get(`${this._auth.getApiURL}/orientacionSexual`).pipe(
      catchError((err) => {
        return throwError(`Error get sexual orientation ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getEpsOptions(): Observable<any>{
    return this._http.get(`${this._auth.getApiURL}/eps`).pipe(
      catchError((err) => {
        return throwError(`Error get eps ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getLevelEducationOptions(): Observable<any>{
    return this._http.get(`${this._auth.getApiURL}/nivelEscolaridad`).pipe(
      catchError((err) => {
        return throwError(`Error get level of education ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getTypeEducationalEstablishment(): Observable<any>{
    return this._http.get(`${this._auth.getApiURL}/tipoEstEducativo`).pipe(
      catchError((err) => {
        return throwError(`Error get type of educational establishment ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getEducationalEstablishment(): Observable<any>{
    return this._http.get(`${this._auth.getApiURL}/establecimientoEducativo`).pipe(
      catchError((err) => {
        return throwError(`Error get educational establishment ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getOccupation(): Observable<any>{
    return this._http.get(`${this._auth.getApiURL}/ocupacion`).pipe(
      catchError((err) => {
        return throwError(`Error get occupation ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getDisplaced(): Observable<any>{
    return this._http.get(`${this._auth.getApiURL}/tipoDesplazado`).pipe(
      catchError((err) => {
        return throwError(`Error get displaced ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getDisability(): Observable<any>{
    return this._http.get(`${this._auth.getApiURL}/discapacidad`).pipe(
      catchError((err) => {
        return throwError(`Error get disability ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getSubDisability(params = null): Observable<any>{
    let httpParams = new HttpParams();
    if (params) {
      for (const key of Object.keys(params)) {
        if (params[key]) {
          httpParams = httpParams.append(key.toString(), params[key]);
        }
      }
    }

    return this._http.get(`${this._auth.getApiURL}/subDiscapacidad`, { params: httpParams })
    .pipe(
      catchError((err) => {
        return throwError(`Error get sub disability ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  showFile(params){
    let httpParams = new HttpParams();

    for (const key of Object.keys(params)) {
      if (params[key]) {
        httpParams = httpParams.append(key.toString(), params[key]);
      }
    }
    
    return this._http.get(`${this._auth.getApiURL}/verArchivo`, {
      params: httpParams,
      responseType: "arraybuffer",
    }).pipe(
      catchError((err) => {
        return throwError(`Error get image ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

  getUsersList(params = null): Observable<any>{
    let httpParams = new HttpParams();

    if (params) {
      for (const key of Object.keys(params)) {
        httpParams = httpParams.append(key.toString(), params[key]);
      }
    }

    return this._http.get(`${this._auth.getApiURL}/user`, { params: httpParams })
      .pipe(
        catchError((err) => {
          return throwError(`Error get users ${err}`);
        }),
        map((resp: any) => {
          return resp;
        })
      );
  }

  viewUser(id: string): Observable<any> {
    return this._http.get(`${this._auth.getApiURL}/user/${id}`).pipe(
      catchError((err) => {
        return throwError(`Error get user ${err}`);
      }),
      map((resp: any) => {
        return resp;
      })
    );
  }

}
