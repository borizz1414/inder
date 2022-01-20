import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Observable, BehaviorSubject } from 'rxjs';

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { CorrectiveMaintenanceService } from 'src/app/corrective-maintenance/services/corrective-maintenance.service';
import { NotifierService } from "src/app/core/services/notifier.service";
import { UserService } from 'src/app/user-profile/services/user.service';

@Component({
  selector: 'app-add-corrective-maintenance',
  templateUrl: './add-corrective-maintenance.component.html',
  styleUrls: ['./add-corrective-maintenance.component.scss']
})
export class AddCorrectiveMaintenanceComponent implements OnInit {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  formGroup: FormGroup;
  id: string = '';
  imagesInitial = [];
  imagesDuring = [];
  imagesFinal = [];
  isLoadingSave: boolean = false;
  isLoadingData: boolean = false;
  isLoadingOfficial: boolean = false;
  isLoadingAssistant: boolean = false;

  scenarioOptions = []
  priorityOptions = []
  typeMaintenanceOptions = []
  typeIdOptions = []
  officialOptions = []
  assistantOptions = []

  scenarioSelected = null
  officialSelected = null
  assistantSelected = null

  constructor(
    private fb: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private _location: Location,
    private _maintenance: CorrectiveMaintenanceService,
    private _notifier: NotifierService,
  ) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.loadForm();

    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params?.id;
      if (this.id) {
        //this.isLoadingSubject.next(true);
        //this.isLoadingData = true;
        //this.getMaintenance();
      }
    });
  }

  getMaintenance(){
    this._maintenance.getMaintenance(this.id).subscribe((resp: any) => {
        console.log('get ', resp.data);
        this.id = resp.data.id;
        this.loadFormValues(resp.data);
     }, 
     (err: any) => console.log(err))
  }

  loadFormValues(data){
    this.formGroup.get('nombre_escenario').setValue(data?.nombre || '');
  }

  loadForm() {
    this.formGroup = this.fb.group({
      nombre_escenario: ['', Validators.required],
      observacionesInicial: [''],
      observacionesDurante: [''],
      observacionesFinal: [''],
    });
  }

  buildBodyCreate(){
    const formValues = this.formGroup.value;
    let formData: any = new FormData();    

    formData.append("nombre_escenario", formValues.nombre_escenario);

    //Display the values
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ' - ' + pair[1]);
    }

    return formData;
  }

  buildBodyUpdate(){
    const formValues = this.formGroup.value;
    let formData: any = {};

    formData = {
      "nombre_escenario": formValues.nombre_escenario,
    }

    console.log('formData', formData);
    
    return formData;
  }

  save() {
    this.isLoadingSave = true;
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    this.id ? this.editMaintenance() : this.createMaintenance();
  }

  createMaintenance() {
    const scenario = this.buildBodyCreate(); 
    // this._scenarios.createScenario(scenario).subscribe(
    //   (resp: any) => {
    //     console.log("scenario created ", resp);
    //     this._notifier.showNotification("", "success");
    //     this.goBack();
    //     this.isLoadingSave = false;
    //   },
    //   (err: any) => {
    //     console.log(err);
    //     this._notifier.showNotification(err, "error");
    //     this.isLoadingSave = false;
    //   }
    // );
  }

  editMaintenance() {
    const scenario = this.buildBodyUpdate()
    // this._scenarios.updateScenario(scenario, this.id).subscribe(
    //   (resp: any) => {
    //     console.log('scenario updated', resp);
    //     this._notifier.showNotification("", "success");
    //     this.goBack();
    //     this.isLoadingSave = false;
    //   },
    //   (err: any) => {
    //     console.log(err);
    //     this._notifier.showNotification("", "error");
    //     this.isLoadingSave = false;
    //   }
    // );
  }

  goBack(){
    this._location.back()
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  getImagesInitial(event){
    this.imagesInitial = event;
    // console.log('get imagesInitial', this.imagesInitial);
    
  }

  getImagesDuring(event){
    this.imagesDuring = event;
    // console.log('get imagesDuring', this.imagesDuring);
    
  }

  getImagesFinal(event){
    this.imagesFinal = event;
    // console.log('get imagesFinal', this.imagesFinal);
    
  }

}
