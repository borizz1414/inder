import { Injectable, OnDestroy } from "@angular/core";
import {
  Observable,
  BehaviorSubject,
  of,
  Subscription,
  throwError,
} from "rxjs";
import { map, catchError, switchMap, finalize } from "rxjs/operators";
import { UserModel } from "../models/user.model";
import { AuthModel } from "../models/auth.model";
import { AuthHTTPService } from "./auth-http";
import { environment } from "src/environments/environment.prod";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../user-profile/services/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `token`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get getApiURL() {
    return environment.apiUrl;
  }
  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private _http: HttpClient
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    // const subscr = this.getUserByToken().subscribe();
    // this.unsubscribe.push(subscr);
  }

  // public methods
  login(body): Observable<any> {
    this.isLoadingSubject.next(true);
    return this._http.post(`${this.getApiURL}/login`, body).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((auth: AuthModel) => {
        this.getUserByToken();
        const result = this.setAuthFromLocalStorage(auth);
        this.isLoadingSubject.next(false);
        return result;
      })
    );
  }
  // LS = LocalStorage
  setUserLS(): Observable<any> {
    return this._http.get(`${this.getApiURL}/auth/user`).pipe(
      catchError((err) => {
        return throwError(err.error.errors);
      }),
      map((resp: any) => {
        console.log("setUserLS", resp);
        let ocupacion;
        let nombre;
        let telefono;
        let roles;
        if(!!resp.ocupacion ) ocupacion = resp.ocupacion;
        if(!!resp.nombre ) nombre = resp.nombre;
        if(!!resp.telefono ) telefono = resp.telefono;
        if(!!resp.roles ) roles =resp.roles;
        
        let user:any = {
          name:resp.nombre,
          id:resp.id,
          username:nombre,
          email:resp.email,
          telefono:telefono,
          ocupacion:ocupacion,
          roles:roles,
        }
        localStorage.setItem('user',JSON.stringify(user))
        return resp;
      })
    );
  }
  removeUserLS(){
    localStorage.removeItem('user');
  }
  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    localStorage.removeItem('user');
    this.router.navigate(["/auth/login"], {
      queryParams: {},
    });
  }

  getUserByToken() {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.access_token) {
      this.logout();
      return of(undefined);
    }
    return auth.access_token;
    // this.isLoadingSubject.next(true);
    // return this.authHttpService.getUserByToken(auth.access_token).pipe(
    //   map((user: UserModel) => {

    //     if (user) {
    //       this.currentUserSubject = new BehaviorSubject<UserModel>(user);
    //     } else {
    //       this.logout();
    //     }
    //     console.log(user)
    //     return user;
    //   }),
    //   finalize(() => this.isLoadingSubject.next(false))
    // );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user)),
      catchError((err) => {
        console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth access_token/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.access_token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
