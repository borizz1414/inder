import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import * as moment from "moment";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { UserService } from "../services/user.service";
import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: "app-account-information",
  templateUrl: "./account-information.component.html",
  styleUrls: ["./account-information.component.scss"],
})
export class AccountInformationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user;
  subscriptions: Subscription[] = [];
  documentFile = null;
  documentFileName: string = "";
  image64 = null;
  archivos = [];
  previsualizacion: string;
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  imgProfile: string;
  isLoadingSave : boolean = false;
  etniaOptions = [];
  sexualOrientationOptions = [];
  epsOptions = [];
  levelEducationOptions = [];
  typeEducationalEstablishment = [];
  educationalEstablishment = [];
  occupationOptions = [];
  displacedOptions = [];
  disabilityOptions = [];
  subDisabilityOptions = [];
  typeIdOptions = [];
  barrioOptions = [];

  constructor(
    private userService: AuthService,
    private fb: FormBuilder,
    private _user: UserService,
    private _scenarios : ScenariosService,
    private sanitizer: DomSanitizer,
    private _notifier: NotifierService,
    private _auth: AuthService,

  ) {}

  ngOnInit(): void {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();

    this.loadForm();
    this.fetchOptions()
    this.changeDisability()
    this.changeBarrio()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  onChangeFile(event: any) {
    const file = event.target.files[0];
    this.extraerBase64(file).then((imagen: any) => {
      console.log('base 64', imagen);
      this.image64 = imagen.base;
      this.previsualizacion = imagen.base;
    });
    this.documentFile = file;
    this.documentFileName = file.name;
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });

  fetchOptions(){
    this.getTypeIdOptions()
    this.getEtniaOptions()
    this.getSexualOrientationOptions()
    this.getEpsOptions()
    this.getLevelEducationOptions()
    this.getTypeEducationalEstablishment()
    this.getEducationalEstablishment()
    this.getOccupation()
    this.getDisplaced()
    this.getDisability()
  }

  getTypeIdOptions(){
    this._scenarios.getTypeIdOptions().subscribe((resp:any) => {
      if(resp){
        this.typeIdOptions = resp.data
      }
     }, 
     (err: any) => console.log(err),
    )
  }

  getNeighborhoodOptions(barrio = null){
    let params : any = {
      select: 'selectOption',
    };
    if(barrio){
      params = {
        ...params,
        nombre: barrio,
      }
    }
    this._scenarios.getNeighborhoodOptions(params).subscribe((resp:any) => {
      if(resp){
        this.barrioOptions = resp.data
      }
     }, 
     (err: any) => console.log(err),
    )
  }

  getEtniaOptions(){
    this._user.getEtniaOptions().subscribe((resp: any) => {
      if (resp) {
        this.etniaOptions = resp.data;
      }
    });
  }

  getSexualOrientationOptions(){
    this._user.getSexualOrientationOptions().subscribe((resp: any) => {
      if (resp) {
        this.sexualOrientationOptions = resp.data;
      }
    });
  }

  getEpsOptions(){
    this._user.getEpsOptions().subscribe((resp: any) => {
      if (resp) {
        this.epsOptions = resp.data;
      }
    });
  }

  getLevelEducationOptions(){
    this._user.getLevelEducationOptions().subscribe((resp: any) => {
      if (resp) {
        this.levelEducationOptions = resp.data;
      }
    });
  }

  getTypeEducationalEstablishment(){
    this._user.getTypeEducationalEstablishment().subscribe((resp: any) => {
      if (resp) {
        this.typeEducationalEstablishment = resp.data;
      }
    });
  }

  getEducationalEstablishment(){
    this._user.getEducationalEstablishment().subscribe((resp: any) => {
      if (resp) {
        this.educationalEstablishment = resp.data;
      }
    });
  }

  getOccupation(){
    this._user.getOccupation().subscribe((resp: any) => {
      if (resp) {
        this.occupationOptions = resp.data;
      }
    });
  }

  getDisplaced(){
    this._user.getDisplaced().subscribe((resp: any) => {
      if (resp) {
        this.displacedOptions = resp.data;
      }
    });
  }

  getDisability(){
    this._user.getDisability().subscribe((resp: any) => {
      if (resp) {
        this.disabilityOptions = resp.data;
      }
    });
  }

  getSubDisability(disability = null){
    let params = null;
    if (disability) {
      params = {
        discapacidad: disability,
      };
    }
    this._user.getSubDisability(params).subscribe((resp: any) => {
      if (resp) {
        this.subDisabilityOptions = resp.data;
      }
    });
  }

  changeDisability() {
    this.formGroup.get("discapacidad_id").valueChanges.subscribe((disability) => {
      if(disability){
        this.getSubDisability(disability)
      }
    });
  }

  changeBarrio() {
    this.formGroup.get("barrio_id").valueChanges.subscribe((value) => {  
      this.getNeighborhoodOptions(value)

      let barrio = this.barrioOptions.find(
        (item) => item.nombrebarrio === value
      );

      this.formGroup
          .get("municipio")
          .setValue(barrio ? 
            barrio.municipio.nombremunicipio : 
            this.user.barrio.municipio.nombremunicipio);
    });
  }

  loadForm() {
    this.formGroup = this.fb.group({
      numero_identificacion: ["", Validators.required],
      tipo_identificacion_id: ["", Validators.required],
      nombre: [
        "",
        Validators.compose([Validators.required, Validators.email]),
      ],
      genero: [""],
      fecha_nacimiento: [""],
      email: [""],
      roles: [""],
      municipio: [""],
      barrio_id: [""],
      direccion: [""],
      eps_id: [""],
      nivel_escolaridad_id: [""],
      tipo_establecimiento_educativo_id: [""],
      establecimiento_educativo_id: [""],
      ocupacion_id: [""],
      etnia_id: [""],
      tipo_desplazado_id: [""],
      discapacidad: [""],
      discapacidad_id: [""],
      sub_discapacidad_id: [""],
      es_jefe_cabeza_hogar: [""],
      orientacion_sexual_id: [""],
    });
    this.getUser();
  }

  getUser() {
    this.isLoadingSubject.next(true);
    this._user.getUser().subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
        this.user = resp;
        this.isLoadingSubject.next(false);
        this.setFormUser(resp);
      }
    });
  }

  setFormUser(user) {
    const full_name = `${user.nombre} ${user.apellido}`;
    this.formGroup.get("numero_identificacion").setValue(user.numero_identificacion);
    this.formGroup.get("tipo_identificacion_id").setValue(user.tipoidentificacion.id);
    this.formGroup.get("nombre").setValue(user.nombre);
    this.formGroup.get("genero").setValue(user.genero);
    this.formGroup.get("email").setValue(user.email);
    this.formGroup.get("roles").setValue(user.roles);
    this.formGroup
      .get("municipio")
      .setValue(user.barrio.municipio.nombremunicipio);
    this.formGroup.get("barrio_id").setValue(user.barrio.nombrebarrio);
    this.formGroup.get("direccion").setValue(user.direccion);
    if(!!user.eps) this.formGroup.get("eps_id").setValue(user.eps.id);
    if(!!user.nivelescolaridad) {
      this.formGroup.get("nivel_escolaridad_id").setValue(user.nivelescolaridad.id);
      this.formGroup
      .get("tipo_establecimiento_educativo_id")
      .setValue(user.tipoestablecimientoeducativo.id);
    this.formGroup
      .get("establecimiento_educativo_id")
      .setValue(user.establecimientoeducativo.id);
    }
  
    this.formGroup.get("ocupacion_id").setValue(user.ocupacion.id);
    this.formGroup.get("etnia_id").setValue(user.etnia.id);
    this.formGroup.get("tipo_desplazado_id").setValue(user.tipodesplazado.id)
    user.discapacidad?.nombre
      ? this.formGroup.get("discapacidad").setValue(true)
      : this.formGroup.get("discapacidad").setValue(false);
    this.formGroup.get("discapacidad_id").setValue(user.discapacidad.id);
    this.formGroup
      .get("sub_discapacidad_id")
      .setValue(user.subdiscapacidad.id);
    this.formGroup.get("es_jefe_cabeza_hogar").setValue(user.es_jefe_cabeza_hogar);
    this.formGroup
      .get("orientacion_sexual_id")
      .setValue(user.orientacionsexual.id);

    const date = moment(user.fecha_nacimiento);
    let formatDate = {
      year: date.year(),
      month: date.month() + 1,
      day: date.date(),
    };
    this.formGroup.get("fecha_nacimiento").setValue(formatDate);

    this.getPerfilImage(user.imagen_perfil)
    this.getSubDisability(user.discapacidad.id)
  }

  getPerfilImage(url){
    let params = {
      url,
    }
    this._user.showFile(params).subscribe((resp: any) => {
      if (resp) {
        const file = new File([resp], url,  {
          type: "image/png",
        });
  
        this.extraerBase64(file).then((imagen: any) => {
          this.image64 = imagen.base;
          this.previsualizacion = imagen.base;
        });
      }
    });
  }

  getBody() {
    const formValues = this.formGroup.value;

    // const { id: barrioId } = this.barrioOptions.find(
    //   (item) => item.nombrebarrio === formValues.barrio_id
    // );
    const date = moment(formValues.fecha_nacimiento).format('YYYY-MM-DD');
    // let formatDate =  `${date.year()}-${date.month()}-${date.date()}`;
    

    const objUser = {
      "tipo_identificacion_id": formValues.tipo_identificacion_id,
      "numero_identificacion": formValues.numero_identificacion,
      "nombre": formValues.nombre,
      "apellido": '',
      "genero": formValues.genero[0].toLowerCase(),
      "fecha_nacimiento":date,
      "barrio_id": 1,
      "direccion": formValues.direccion,
      "roles": formValues.roles,
      "direccion_comuna": formValues.direccion,
      "discapacidad_id": formValues.discapacidad_id,
      "sub_discapacidad_id": formValues.sub_discapacidad_id,
      "email": formValues.email,
      "imagen_perfil": this.image64,
      "eps_id": formValues.eps_id,
      "es_jefe_cabeza_hogar": String(formValues.es_jefe_cabeza_hogar),
      "establecimiento_educativo_id": formValues.establecimiento_educativo_id,
      "etnia_id": formValues.etnia_id,
      "nivel_escolaridad_id": formValues.nivel_escolaridad_id,
      "ocupacion_id": formValues.ocupacion_id,
      "orientacion_sexual_id": formValues.orientacion_sexual_id,
      "tipo_desplazado_id": formValues.tipo_desplazado_id,
      "tipo_establecimiento_educativo_id": formValues.tipo_establecimiento_educativo_id,
    }
    console.log('objUser', objUser);
    
    return objUser;
  }

  save() {
    this.isLoadingSave = true;
    // this.formGroup.markAllAsTouched();
    // if (!this.formGroup.valid) {
    //   return;
    // }

    const body = this.getBody()
    this.editUser(body);
    
    //prepar user
    // this.user = Object.assign(this.user, {
    //   username: formValues.username,
    //   email: formValues.email,
    //   language: formValues.language,
    //   timeZone: formValues.timeZone,
    //   communication: {
    //     email: formValues.communicationEmail,
    //     sms: formValues.communicationSMS,
    //     phone: formValues.communicationPhone
    //   }
    // });
    // Do request to your server for user update, we just imitate user update there
    // this.userService.isLoadingSubject.next(true);
    // setTimeout(() => {
    //   this.userService.currentUserSubject.next(Object.assign({}, this.user));
    //   this.userService.isLoadingSubject.next(false);
    // }, 2000);
  }

  editUser(body){
    this._user.updateUser(this.user.id, body)
    .subscribe((resp: any) => {
      console.log("user response", resp);
      this._notifier.showNotification('', 'success');
      this.isLoadingSave = false;
      // localStorage.setItem('r')
      window.location.reload()
      this._auth.setUserLS()
    },
    (err: any) => {
      console.log(err)
      this._notifier.showNotification('', 'error');
      this.isLoadingSave = false;
    });
  }

  cancel() {
    // this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    // const control = this.formGroup.controls[controlName];
    // return control.valid && (control.dirty || control.touched);
    return true;
  }

  isControlInvalid(controlName: string): boolean {
    // const control = this.formGroup.controls[controlName];
    // return control.invalid && (control.dirty || control.touched);
    return true;
  }
}
