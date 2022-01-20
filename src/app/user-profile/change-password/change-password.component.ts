import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { AuthService, UserModel, ConfirmPasswordValidator } from "../../auth";
import { UserService } from "../services/user.service";
import { NotifierService } from "../../core/services/notifier.service";


@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  idUser: number;
  constructor(
    private fb: FormBuilder,
    private _user: UserService,
    private _notifier: NotifierService,
    private _auth: AuthService,
  ) {
    // this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    // const sb = this.userService.currentUserSubject.asObservable().pipe(
    //   first(user => !!user)
    // ).subscribe(user => {
    //   this.user = Object.assign({}, user);
    //   this.firstUserState = Object.assign({}, user);
    this.loadForm();
    this.getUser()
    // });
    // this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    // this.subscriptions.forEach(sb => sb.unsubscribe());
  }
  getUser() {
    this._user.getUser().subscribe((resp: any) => {
      if (resp) {
      this.idUser =resp.id
      
      }
      
    });
  }

  loadForm() {
    this.formGroup = this.fb.group(
      {
        contrasena_actual: ["", Validators.required],
        nueva_contrasena: ["", Validators.required],
        nueva_contrasena_confirmation: ["", Validators.required],
      }
      // {
      //   validator: ConfirmPasswordValidator.MatchPassword
      // }
    );
  }

  save() {
    // this.formGroup.markAllAsTouched();
    // if (!this.formGroup.valid) {
    //   return;
    // }
    let formValues = {
      ...this.formGroup.value,
      actualizar_contrasena: "actualizar",
    };
    console.log(this.idUser) 
    this.isLoadingSubject.next(true);
    console.log(formValues);
    this._user.updateUser(this.idUser , formValues).subscribe(
      (resp: any) => {
        console.log(resp);
        if(resp){
          this._notifier.showNotification("Operación exitosa","success");
          this.isLoadingSubject.next(false);
        }
      },
      (err) => {
        console.log(err);
        this._notifier.showNotification("", "error");
        this.isLoadingSubject.next(false);
      }
    );
    this.formGroup.reset()
    // this.user.password = this.formGroup.value.password;
    // this.userService.isLoadingSubject.next(true);
    // setTimeout(() => {
    //   this.userService.currentUserSubject.next(Object.assign({}, this.user));
    //   this.userService.isLoadingSubject.next(false);
    // }, 2000);
  }

  cancel() {
    // this.user = Object.assign({}, this.firstUserState);
    this.formGroup.reset()
    this.loadForm();
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    // const control = this.formGroup.controls[controlName];
    // return control.valid && (control.dirty || control.touched);
    return false;
  }

  isControlInvalid(controlName: string): boolean {
    // const control = this.formGroup.controls[controlName];
    // return control.invalid && (control.dirty || control.touched);
    return false;
  }

  controlHasError(validation, controlName): boolean {
    // const control = this.formGroup.controls[controlName];
    // return control.hasError(validation) && (control.dirty || control.touched);
    return false;
  }

  isControlTouched(controlName): boolean {
    // const control = this.formGroup.controls[controlName];
    // return control.dirty || control.touched;
    return false;
  }
}
