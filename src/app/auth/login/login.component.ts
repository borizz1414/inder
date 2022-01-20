import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { first, switchMap } from 'rxjs/operators';
import { UserModel } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from '../../core/services/notifier.service';
import { ScenariosService } from '../../core/services/scenarios.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  // defaultAuth = {
  //   email: '',
  //   password: '',
  // };
  defaultAuth: any = {
    email: "admin@demo.com",
    password: "demo",
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading: boolean = false;
  showPassword: boolean = false;
  typeIdOptions;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _notifier: NotifierService,
    private _scenario: ScenariosService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    this.initForm();

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl".toString()] || "/";
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.loginForm.controls;
  }
  
  initForm() {
    this.loginForm = this.fb.group({
      type_document: [
        '',
        [
          Validators.required,
        ],
      ],
      number_document: [
        '',
        [
          Validators.required,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
    });
    this._scenario.getTypeIdOptions().subscribe((resp) =>{
      this.typeIdOptions = resp.data;
    })
  }
  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }
  submit() {
    this.hasError = false;
    this.isLoading= true;
    const user = {
      tipo_identificacion_id : parseInt(this.form.type_document.value),
      numero_identificacion:this.form.number_document.value,
      password:this.form.password.value
    }
    console.log(user)
    const loginSubscr = this.authService
      .login(user).pipe(switchMap((resp)=> this.authService.setUserLS()))
      .subscribe((user) => {
        console.log(user , 'user')
        if (user) {
          console.log('si')
          this.router.navigateByUrl('/inicio');
          
        } else {
          this.isLoading= false;
          console.log('no')
          this.hasError = true;
        }
      },     (err: any) => {
        this.isLoading = false;
        if(err == undefined) return this._notifier.showNotification(['Datos erroneos'], "error");
        this._notifier.showNotification(err, "error");
      }
      );
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
