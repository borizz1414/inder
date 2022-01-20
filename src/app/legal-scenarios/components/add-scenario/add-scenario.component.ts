import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Observable, BehaviorSubject } from "rxjs";
import * as Mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as moment from "moment";

import { ScenariosService } from "src/app/core/services/scenarios.service";
import { NotifierService } from "src/app/core/services/notifier.service";
import { environment } from "src/environments/environment";
import { CustomValidators } from "src/app/utils/validators";
import { DomSanitizer } from "@angular/platform-browser";
import { SelectOptionsService } from '../../../core/services/select-options.service';

@Component({
  selector: "app-add-scenario",
  templateUrl: "./add-scenario.component.html",
  styleUrls: ["./add-scenario.component.scss"],
})
export class AddScenarioComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  formGroup: FormGroup;
  id: string;
  dateReception: any;
  hora_recepcion = null;
  meridian = true;
  spinners = false;
  typeAddress: number = 1;
  files = {
    acta_entrega: null,
    avaluo_comercial: null,
    estudio_titulo_predio: null,
    ficha_catastral: null,
  };
  filesNames = {
    acta_entrega: "",
    avaluo_comercial: "",
    estudio_titulo_predio: "",
    ficha_catastral: "",
  };
  despachoOptions = [];
  municipioOptions = [];
  barrioOptions = [];
  veredaOptions = [];
  tipoEquipamientoOptions = [];
  typeAddressOptions = [];
  isVereda: boolean = false;
  isLoadingSave: boolean = false;

  map: Mapboxgl.Map;
  marker: Mapboxgl.Marker;
  @ViewChild("asGeoCoder") asGeoCoder: ElementRef;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private _location: Location,
    private _scenarios: ScenariosService,
    private _notifier: NotifierService,
    private renderer2: Renderer2,
    private sanitizer: DomSanitizer,
    private _selectOptions: SelectOptionsService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.loadForm();
    this.createMap();
    this.fetchOptions();
  }

  getScenario() {
   

    this.isLoadingSubject.next(true);
    this._scenarios.getScenario(this.id).subscribe((resp: any) => {
      ((document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0] as HTMLInputElement).value) = resp.data.direccion
      console.log(resp, "scenario");
      if(!!resp.data.despacho) this.formGroup.get("despacho_id").setValue(resp.data.despacho.id);
      this.formGroup.get("nombre_escenario").setValue(resp.data.nombre);
        if(!!resp.data.municipio) this.formGroup.get("municipio_id").setValue(resp.data.municipio.id);
      this.formGroup.get("barrio_id").setValue(resp.data.barrio_id);
      this.formGroup.get("direccion").setValue(resp.data.direccion);
      this.formGroup.get("latitud").setValue(resp.data.latitud);
      this.formGroup.get("longitud").setValue(resp.data.longitud);
      this.formGroup
        .get("tipo_equipamiento_id")
        .setValue(resp.data.tipo_equipamiento_id);

      const {
        acta_entrega,
        avaluo_comercial,
        estudio_titulo_predio,
        ficha_catastral,
      } = resp.data;

      this.filesNames = {
        acta_entrega: acta_entrega
          ? `acta de entrega.${acta_entrega.split(".")[1]}`
          : "",
        avaluo_comercial: avaluo_comercial
          ? `avalúo comercial.${avaluo_comercial.split(".")[1]}`
          : "",
        estudio_titulo_predio: estudio_titulo_predio
          ? `títulos de predio.${estudio_titulo_predio.split(".")[1]}`
          : "",
        ficha_catastral: ficha_catastral
          ? `ficha catastral.${ficha_catastral.split(".")[1]}`
          : "",
      };

      this.isLoadingSubject.next(false);

      const date = moment(resp.data.fecha_recepcion);
      const time = resp.data.hora_recepcion;
      this.dateReception = {
        year: date.year(),
        month: date.month() + 1,
        day: date.date(),
      };
      this.hora_recepcion = {
        hour: parseInt(time.slice(0, 2)),
        minute: parseInt(time.slice(3, 5)),
      };
    });
  }

  loadForm() {
    this.formGroup = this.fb.group({
      despacho_id: ["", Validators.required],
      fecha_recepcion: ["", Validators.required],
      nombre_escenario: [
        "",
        [Validators.required, CustomValidators.maximumLength],
      ],
      municipio_id: ["", Validators.required],
      barrio_id: ["", Validators.required],
      vereda: [""],
      direccion: ["", [Validators.required, CustomValidators.maximumLength]],
      latitud: ["", CustomValidators.maximumLength],
      longitud: ["", CustomValidators.maximumLength],
      tipo_equipamiento_id: [""],
    });
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params?.id;
      if (this.id) {
        return this.getScenario();
      }
    });
  }

  createMap() {
    Mapboxgl.accessToken = environment.mapboxKey;

    // Initial coordinates Medellín
    const lon = -75.5664091;
    const lat = 6.2477619;

    // Create map
    this.map = new Mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [lon, lat], // starting position [Lon, Lat]
      zoom: 12.7, // starting zoom
    });

    this.createGeocoder();
  }

  createGeocoder() {
    // Create geocoder input
    const geocoder = new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      marker: {
        color: "transparent",
      },
      mapboxgl: Mapboxgl,
    });

    // Wait while html asGeoCoder element is ready
    setTimeout(() => {
      this.renderer2.appendChild(
        this.asGeoCoder.nativeElement,
        geocoder.onAdd(this.map)
      );

      document
        .getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0]
        .setAttribute("placeholder", "");
    }, 1000);

    // Get the coordinates and place name searched
    geocoder.on("result", ($event) => {
      const { result } = $event;
      const { center: coordinates, place_name: placeName } = result;

      this.formGroup.get("direccion").setValue(placeName);
      this.formGroup.get("longitud").setValue(coordinates[0]);
      this.formGroup.get("latitud").setValue(coordinates[1]);

      // Add draggble mark to map
      this.createMark(coordinates[0], coordinates[1]);
    });
  }

  createMark(lon: number, lat: number) {
    this.marker = new Mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lon, lat])
      .addTo(this.map);

    this.marker.on("dragend", () => {
      this.formGroup.patchValue({
        longitud: this.marker.getLngLat().lng,
        latitud: this.marker.getLngLat().lat,
      });
    });
  }

  fetchOptions() {
    this.fetchDespachoOptions();
    this.fetchMunicipioOptions();
    this.fetchBarrioOptions();
    this.fetchTipoEquipamientoOptions();
    this.fetchtypeAddres()
  }

  fetchDespachoOptions() {
    this._scenarios.getOfficeOptions().subscribe(
      (resp: any) => {
        this.despachoOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }

  fetchMunicipioOptions() {
    this._scenarios.getMunicipalityOptions().subscribe(
      (resp: any) => {
        this.municipioOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }

  fetchBarrioOptions() {
    let params = {
      es_vereda: this.isVereda,
    };

    this._scenarios.getNeighborhoodOptions(params).subscribe(
      (resp: any) => {
        if (this.isVereda) {
          this.veredaOptions = resp.data;
        } else {
          this.barrioOptions = resp.data;
        }
      },
      (err: any) => console.log(err)
    );
  }

  fetchTipoEquipamientoOptions() {
    this._scenarios.getTypeEquipmentOptions().subscribe(
      (resp: any) => {
        this.tipoEquipamientoOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }
  fetchtypeAddres() {
    this._selectOptions.getTypeAddress().subscribe(
      (resp: any) => {
        this.typeAddressOptions = resp.data;
      },
      (err: any) => console.log(err)
    );
  }

  changeTypeAddress() {
    const barrio_id = this.formGroup.get("barrio_id");

    if (this.typeAddress == 1) {
      barrio_id.setValidators([Validators.required]);
      this.isVereda = false;
    } else {
      barrio_id.setValidators(null);
      this.isVereda = true;

      if (this.veredaOptions.length === 0) {
        this.fetchBarrioOptions();
      }
    }

    barrio_id.updateValueAndValidity();
  }

  onChangeFile(event: any, fileName: string) {
    const file = event.target.files[0];
    console.log(fileName, "fileName");
    if (this.id) {
      this.extraerBase64(file).then((file: any) => {
        console.log("base 64", file);
        this.files[fileName] = file.base;
      });

      console.log(file);
    }else{
      this.files[fileName] = file;
    }

    this.filesNames[fileName] = file.name;
  }

  goBack() {
    this._location.back();
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

  buildScenarioValue(){
    const formValues = this.formGroup.value;
    let formData : any = new FormData();

    // Format date
    const { year, month, day } = formValues.fecha_recepcion;
    const formatDate = `${year}-${month}-${day}`;
    const newReceptionDate = moment(formatDate).format("YYYY-MM-DD");

    // Required fields
    formData.append("nombre_escenario", formValues.nombre_escenario);
    formData.append("despacho_id", formValues.despacho_id);
    formData.append("fecha_recepcion", newReceptionDate);
    formData.append("municipio_id", formValues.municipio_id);
    formData.append("direccion", formValues.direccion);
    formData.append("barrio_id", this.isVereda ? formValues.vereda : formValues.barrio_id);    
    formData.append("tipo_direccion_id", this.typeAddress);    
    // Optionals fields
    if(this.files.acta_entrega){
      formData.append("acta_entrega", this.files.acta_entrega);
    }

    if(this.files.avaluo_comercial){
      formData.append("avaluo_comercial", this.files.avaluo_comercial);
    }

    if(this.files.estudio_titulo_predio){
      formData.append("estudio_titulo_predio", this.files.estudio_titulo_predio);
    }

    if(this.files.ficha_catastral){
      formData.append("ficha_catastral", this.files.ficha_catastral);
    }

    if(formValues.latitud){
      formData.append("latitud", formValues.latitud);
    }

    if(formValues.longitud){
      formData.append("longitud", formValues.longitud);
    }

    if(formValues.tipo_equipamiento_id){
      formData.append("tipo_equipamiento_id", formValues.tipo_equipamiento_id);
    }

    // Format time
    if(this.hora_recepcion){
      const { hour, minute } = this.hora_recepcion;
      const formatTime = `${hour}:${minute}`
      const newReceptionTime = moment(`${formatDate} ${formatTime}`).format('LT').toLocaleLowerCase()

      formData.append("hora_recepcion", newReceptionTime);
    }

    return formData;
  }
  
  buildScenarioUpdate() {
    const formValues = this.formGroup.value;
    let formData = {};

    // Format date
    const { year, month, day } = formValues.fecha_recepcion;
    const formatDate = `${year}-${month}-${day}`;
    const newReceptionDate = moment(formatDate).format("YYYY-MM-DD");

    // Required fields

    this.formGroup.get("fecha_recepcion").setValue(newReceptionDate);
    // Format time
    if (this.hora_recepcion) {
      const { hour, minute } = this.hora_recepcion;
      const formatTime = `${hour}:${minute}`;
      const newReceptionTime = moment(`${formatDate} ${formatTime}`)
        .format("LT")
        .toLocaleLowerCase();
      formData = { ...formData, hora_recepcion: newReceptionTime };
    }

    formData = { ...this.formGroup.value, tipo_direccion_id: this.typeAddress };
    // Optionals fields
    if (this.files.acta_entrega) {
      formData = { ...formData, acta_entrega: this.files.acta_entrega };
    }

    if (this.files.avaluo_comercial) {
      formData = { ...formData, avaluo_comercial: this.files.avaluo_comercial };
    }

    if (this.files.estudio_titulo_predio) {
      formData = {
        ...formData,
        estudio_titulo_predio: this.files.estudio_titulo_predio,
      };
    }

    if (this.files.ficha_catastral) {
      formData = { ...formData, ficha_catastral: this.files.ficha_catastral };
    }

    return formData;
  }

  save() {
    this.isLoadingSave = true;
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }


    

    // Display the values
    // for (var pair of newScenario.entries()) {
    //   console.log(pair[0]+ ' - ' + pair[1]);
    // }
    this.id ? this.editScenario() : this.createScenario();
  }

  editScenario() {
    const scenario = this.buildScenarioUpdate()
    this._scenarios.updateScenario(scenario, this.id).subscribe(
      (resp: any) => {
        console.log(resp);
        this._notifier.showNotification("", "success");
        this.goBack();
        this.isLoadingSave = false;
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification("", "error");
        this.isLoadingSave = false;
      }
    );
  }

  createScenario() {
    const scenario = this.buildScenarioValue(); 
    this._scenarios.createScenario(scenario).subscribe(
      (resp: any) => {
        console.log("scenario created ", resp);
        this._notifier.showNotification("", "success");
        this.goBack();
        this.isLoadingSave = false;
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification(err, "error");
        this.isLoadingSave = false;
      }
    );
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
