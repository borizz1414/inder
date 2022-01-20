import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private _auth : AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    request = this.addHeader(request);
    return next.handle(request);

  }

  private addHeader(request: HttpRequest<any>){
      const token = this._auth.getUserByToken();
      if(token == undefined) return request;
      request = request.clone({
          setHeaders:{
              ApiSimonHeader:'ApiSimonLaravel',
              Authorization: `Bearer ${token}`
          }
      });
      return request;
    
  }
}
