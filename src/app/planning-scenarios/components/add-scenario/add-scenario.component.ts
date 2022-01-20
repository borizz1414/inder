import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Observable, BehaviorSubject } from 'rxjs';
import * as Mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as moment from 'moment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { NotifierService } from "src/app/core/services/notifier.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-add-scenario',
  templateUrl: './add-scenario.component.html',
  styleUrls: ['./add-scenario.component.scss']
})
export class AddScenarioComponent implements OnInit {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  formGroup: FormGroup;
  id: string = '';
  typeAddress: string = 'Barrio';
  isLoadingSave: boolean = false;
  isLoadingData: boolean = false;
  isVereda: boolean = false;
  fecha_elaboracion: any = '';
  fecha_construccion: any = '';
  municipioOptions = [];
  barrioOptions = [];
  veredaOptions = [];
  tipoEquipamientoOptions = [];
  interventions = [];
  configInterventions = {
    name: "Intervenciones",
    columns: ["AÑO", "CONTRATISTA", "N° CONTRATO", "OBJETO / DESCRIPCIÓN"],
  };
  map: Mapboxgl.Map;
  marker: Mapboxgl.Marker;
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  discipline = new FormControl('');
  filteredDisciplines: any[] = []
  disciplines: any[] = [];
  allDisciplines: any[] = [];
  @ViewChild('disciplineInput') disciplineInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private _location: Location,
    private renderer2: Renderer2,
    private _scenarios : ScenariosService,
    private _notifier: NotifierService,
  ) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.loadForm();
    this.createMap();
    this.fetchOptions();

    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params?.id;
      if (this.id) {
        this.isLoadingSubject.next(true);
        this.isLoadingData = true;
        return this.getScenario();
      }
    });
  }

  getScenario(){
    this._scenarios.getScenario(this.id).subscribe((resp: any) => {
        console.log('get scenario ', resp.data);
        this.id = resp.data.id;
        this.loadFormValues(resp.data);
     }, 
     (err: any) => console.log(err))
  }

  loadFormValues(data){
    this.formGroup.get('nombre_escenario').setValue(data?.nombre || '');
    this.formGroup.get('telefono').setValue(data?.telefono || '');
    this.formGroup.get('email').setValue(data?.email || '');
    this.formGroup.get('municipio_id').setValue(data?.barrio?.municipio?.id || '');
    if(data?.barrio?.es_vereda){
      this.formGroup.get('vereda').setValue(data?.barrio?.id || '');
      this.typeAddress = 'Vereda';
      this.isVereda = true; 
      if(this.veredaOptions.length === 0){
        this.fetchBarrioOptions();
      }
    }else{
      this.formGroup.get('barrio_id').setValue(data?.barrio?.id || '');
    }
    this.formGroup.get('direccion').setValue(data?.direccion || '');
    this.formGroup.get('nombre_equipamiento').setValue(data?.nombre_equipamiento || '');
    this.formGroup.get('tipo_equipamiento_id').setValue(data?.tipo_equipamiento_id || '');
    this.formGroup.get('latitud').setValue(data?.latitud || '');
    this.formGroup.get('longitud').setValue(data?.longitud || '');
    this.formGroup.get('informacion_reserva').setValue(data?.informacionreserva || '');

    this.formGroup.get('codigo_escenario').setValue(data?.codigoescenario || '');
    if(data?.fecha_elaboracion){
      const date = moment(data?.fecha_elaboracion);
      this.fecha_elaboracion = {
        year: date.year(),
        month: date.month() + 1,
        day: date.date(),
      };
    }
    this.formGroup.get('cobama_lote').setValue(data?.cobamalote || '');
    this.formGroup.get('areas_complementarias').setValue(data?.areas_complementarias || '');
    this.formGroup.get('area_juego').setValue(data?.area_juego || '');
    this.formGroup.get('area_zona_verde').setValue(data?.area_zona_verde || '');
    this.formGroup.get('area_circulacion').setValue(data?.area_circulacion || '');
    this.formGroup.get('area_circulacion_interna').setValue(data?.area_circulacion_interna || '');
    this.formGroup.get('area_total').setValue(data?.area_total || '');
    this.formGroup.get('observaciones').setValue(data?.observaciones || '');
    this.formGroup.get('clasificacion_suelo').setValue(data?.clasificacion_suelo || '');
    this.formGroup.get('aforo_practicas_deportivas').setValue(data?.aforo_practicas_deportivas || '');
    this.formGroup.get('aforo_eventos').setValue(data?.aforo_eventos || '');
    this.formGroup.get('aforo_graderias').setValue(data?.aforo_graderias || '');
    if(data?.disciplinas.length){
      this.disciplines = data.disciplinas.map(item => item.nombre)
    }

    this.formGroup.get('observaciones_acueducto').setValue(data?.observaciones_acueducto || '');
    this.formGroup.get('observaciones_energia').setValue(data?.observaciones_energia || '');
    this.formGroup.get('observaciones_telefono').setValue(data?.observaciones_telefono || '');
    this.formGroup.get('observaciones_internet').setValue(data?.observaciones_internet || '');
    this.formGroup.get('observaciones_iluminacion').setValue(data?.observaciones_iluminacion || '');
    this.formGroup.get('observaciones_alcantarillado').setValue(data?.observaciones_alcantarillado || '');

    if(data?.fecha_construccion){
      const date = moment(data?.fecha_construccion);
      this.fecha_construccion = {
        year: date.year(),
        month: date.month() + 1,
        day: date.date(),
      };
    }
    this.formGroup.get('constructor').setValue(data?.constructor || '');
    this.formGroup.get('obra_basica_inicial').setValue(data?.obra_basica_inicial || '');
    if(data?.intervenciones.length){
      this.interventions = data.intervenciones;
    }

    this.formGroup.get('norma_retie').setValue(data?.norma_retie || '');
    this.formGroup.get('norma_nsr').setValue(data?.norma_nsr || '');
    this.formGroup.get('sistema_ahorro_energia').setValue(data?.sistema_ahorro_energia || '');
    this.formGroup.get('sistema_ahorro_agua').setValue(data?.sistema_ahorro_agua || '');

    this.isLoadingSubject.next(false);
    this.isLoadingData = false;
  }

  loadForm() {
    this.formGroup = this.fb.group({
      // General Info
      nombre_escenario: ['', Validators.required],
      telefono: [''],
      email: ['', Validators.email],
      nombre_equipamiento: ['', Validators.required],
      tipo_equipamiento_id:[''],
      municipio_id: ['', Validators.required],
      barrio_id: [''],
      vereda: [''],
      direccion: [''],
      latitud: [''],
      longitud: [''],
      informacion_reserva: [''],
      // Supplementary data
      codigo_escenario: ['', Validators.required],
      cobama_lote: [''],
      areas_complementarias: [''],
      area_juego: [''],
      area_zona_verde: [''],
      area_circulacion: [''],
      area_circulacion_interna: [''],
      area_total: [''],
      observaciones: [''],
      clasificacion_suelo: [''],
      aforo_practicas_deportivas: [''],
      aforo_eventos: [''],
      aforo_graderias: [''],
      // Public services
      observaciones_acueducto: [''],
      observaciones_energia: [''],
      observaciones_telefono: [''],
      observaciones_internet: [''],
      observaciones_iluminacion: [''],
      observaciones_alcantarillado: [''],
      // Historical review
      constructor: [''],
      obra_basica_inicial: [''],
      // Sustainability elements
      norma_retie: [''],
      norma_nsr: [''],
      sistema_ahorro_energia: [''],
      sistema_ahorro_agua: [''],
    });
  }

  createMap(){
    Mapboxgl.accessToken = environment.mapboxKey;

    // Initial coordinates Medellín
    const lon = -75.5664091;
    const lat = 6.2477619;

    // Create map
    this.map = new Mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [lon, lat], // starting position [Lon, Lat]
      zoom: 12.7 // starting zoom
    });

    this.createGeocoder()
  }

  createGeocoder(){
    // Create geocoder input
    const geocoder = new MapboxGeocoder({
      accessToken: Mapboxgl.accessToken,
      marker: {
        color: 'transparent',
      },
      mapboxgl: Mapboxgl
    });

    // Wait while html asGeoCoder element is ready
    setTimeout(() => {
      this.renderer2.appendChild(this.asGeoCoder.nativeElement,
        geocoder.onAdd(this.map)
      );

      document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0]
      .setAttribute("placeholder", 'Ingresa la dirección del escenario');
    }, 1000);

    // Get the coordinates and place name searched 
    geocoder.on('result', ($event) => {
      const { result } = $event
      const { center: coordinates , place_name: placeName } = result

      this.formGroup.get('direccion').setValue(placeName)
      this.formGroup.get('longitud').setValue(coordinates[0])
      this.formGroup.get('latitud').setValue(coordinates[1])

      // Add draggble mark to map
      this.createMark(coordinates[0], coordinates[1])
    })
  }

  createMark(lon: number, lat: number){
    this.marker = new Mapboxgl.Marker({
      draggable: true,
      })
      .setLngLat([lon, lat])
      .addTo(this.map);

      this.marker.on('dragend', () => {
        this.formGroup.patchValue({
          longitud: this.marker.getLngLat().lng,
          latitud: this.marker.getLngLat().lat,
        })
      });
  }

  fetchOptions(){
    this.fetchMunicipioOptions();
    this.fetchBarrioOptions();
    this.fetchTipoEquipamientoOptions();
    this.fetchDisciplinaOptions();
  }

  fetchMunicipioOptions(){
    this._scenarios.getMunicipalityOptions().subscribe((resp:any) => {
      this.municipioOptions = resp.data
      }, 
     (err: any) => console.log(err),
    )
  }

  fetchBarrioOptions(){
    let params = { 
      es_vereda: this.isVereda, 
    };

    this._scenarios.getNeighborhoodOptions(params).subscribe((resp:any) => {
      if(this.isVereda){
        this.veredaOptions = resp.data
      }else{
        this.barrioOptions = resp.data
      }
     }, 
     (err: any) => console.log(err)
    )
  }

  fetchTipoEquipamientoOptions(){
    this._scenarios.getTypeEquipmentOptions().subscribe((resp:any) => {
      this.tipoEquipamientoOptions = resp.data
     }, 
     (err: any) => console.log(err),
    )
  }

  filterDisciplines(){  
    this.discipline.valueChanges.subscribe((value) => {
      value ? this.fetchDisciplinaOptions(value) : this.allDisciplines
    });
  }

  fetchDisciplinaOptions(search: string | null = null): any {    
    let params = null;
    if(search !== null){
      params = {
        nombre: search
      }
    }
    this._scenarios.getDisciplineOptions(params).subscribe((resp:any) => {
      if(search !== null){
        this.filteredDisciplines = resp.data
      }else{
        this.allDisciplines = resp.data
        this.filterDisciplines()
      }
     }, 
     (err: any) => {
       console.log(err)
       return [];
      },
    )
  }

  changeTypeAddress(){
    if(this.typeAddress === 'Barrio'){
      this.isVereda = false;
    }else{
      this.isVereda = true; 
      if(this.veredaOptions.length === 0){
        this.fetchBarrioOptions();
      }
    }
  }

  getDateFormat(date) {
    const { year, month, day } = date;
    const stringDate = `${year}-${month}-${day}`;
    // const newDate = moment(stringDate).format("DD-MM-YYYY");
    const newDate = moment(stringDate).format("YYYY-MM-DD");

    return newDate;
  }

  getDisciplinesId(disciplines){
    const disciplinesId = []

    this.allDisciplines.forEach(item => {
      disciplines.forEach(discipline => {
        if(discipline === item.nombre){
          disciplinesId.push(item.id)
        }
      })
    })

    return disciplinesId;
  }

  buildBodyCreate(){
    const formValues = this.formGroup.value;
    let formData: any = new FormData();    

    formData.append("nombre_escenario", formValues.nombre_escenario);
    formData.append("telefono", formValues.telefono);
    formData.append("email", formValues.email);
    formData.append("nombre_equipamiento", formValues.nombre_equipamiento);
    formData.append("tipo_equipamiento_id", formValues.tipo_equipamiento_id);
    formData.append("municipio_id", formValues.municipio_id);
    formData.append("barrio_id", this.isVereda ? formValues.vereda : formValues.barrio_id);    
    formData.append("direccion", formValues.direccion);
    formData.append("latitud", formValues.latitud);
    formData.append("longitud", formValues.longitud);
    formData.append("informacion_reserva", formValues.informacion_reserva);
    
    formData.append("codigo_escenario", formValues.codigo_escenario);
    if(this.fecha_elaboracion){
      formData.append("fecha_elaboracion", this.getDateFormat(this.fecha_elaboracion));
    }
    formData.append("cobama_lote", formValues.cobama_lote);
    formData.append("areas_complementarias", formValues.areas_complementarias);
    formData.append("area_juego", formValues.area_juego);
    formData.append("area_zona_verde", formValues.area_zona_verde);
    formData.append("area_circulacion", formValues.area_circulacion);
    formData.append("area_circulacion_interna", formValues.area_circulacion_interna);
    formData.append("area_total", formValues.area_total);
    formData.append("observaciones", formValues.observaciones);
    formData.append("clasificacion_suelo", formValues.clasificacion_suelo);
    formData.append("aforo_practicas_deportivas", formValues.aforo_practicas_deportivas);
    formData.append("aforo_eventos", formValues.aforo_eventos);
    formData.append("aforo_graderias", formValues.aforo_graderias);
    if(this.disciplines.length){
      const diciplinesIds = this.getDisciplinesId(this.disciplines)
      diciplinesIds.forEach(item => {
        formData.append("disciplinas[]", item);
      })
    }
  
    formData.append("observaciones_acueducto", formValues.observaciones_acueducto);
    formData.append("observaciones_energia", formValues.observaciones_energia);
    formData.append("observaciones_telefono", formValues.observaciones_telefono);
    formData.append("observaciones_internet", formValues.observaciones_internet);
    formData.append("observaciones_iluminacion", formValues.observaciones_iluminacion);
    formData.append("observaciones_alcantarillado", formValues.observaciones_alcantarillado);

    if(this.fecha_construccion){
      formData.append("fecha_construccion", this.getDateFormat(this.fecha_construccion));
    }
    formData.append("constructor", formValues.constructor);
    formData.append("obra_basica_inicial", formValues.obra_basica_inicial);
    if(this.interventions.length){
      this.interventions.forEach(item => {
        item.id ? 
        formData.append("intervencion_id[]", item.id) : formData.append("intervencion_id[]", []);

        formData.append("intervencion_anio[]", item.anio)
        formData.append("intervencion_contratista[]", item.contratista)
        formData.append("intervencion_numero_contrato[]", item.numero_contrato)
        formData.append("intervencion_descripcion[]", item.descripcion)
      })
    }

    formData.append("norma_retie", formValues.norma_retie);
    formData.append("norma_nsr", formValues.norma_nsr);
    formData.append("sistema_ahorro_energia", formValues.sistema_ahorro_energia);
    formData.append("sistema_ahorro_agua", formValues.sistema_ahorro_agua);

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
      "telefono": formValues.telefono,
      "email": formValues.email,
      "nombre_equipamiento": formValues.nombre_equipamiento,
      "tipo_equipamiento_id": formValues.tipo_equipamiento_id,
      "municipio_id": formValues.municipio_id,
      "barrio_id": this.isVereda ? formValues.vereda : formValues.barrio_id,
      "direccion": formValues.direccion,
      "latitud": formValues.latitud,
      "longitud": formValues.longitud,
      "informacion_reserva": formValues.informacion_reserva,

      "codigo_escenario": formValues.codigo_escenario,
      "cobama_lote": formValues.cobama_lote,
      "areas_complementarias": formValues.areas_complementarias,
      "area_juego": formValues.area_juego,
      "area_zona_verde": formValues.area_zona_verde,
      "area_circulacion": formValues.area_circulacion,
      "area_circulacion_interna": formValues.area_circulacion_interna,
      "area_total": formValues.area_total,
      "observaciones": formValues.observaciones,
      "clasificacion_suelo": formValues.clasificacion_suelo,
      "aforo_practicas_deportivas": formValues.aforo_practicas_deportivas,
      "aforo_eventos": formValues.aforo_eventos,
      "aforo_graderias": formValues.aforo_graderias,

      "observaciones_acueducto": formValues.observaciones_acueducto,
      "observaciones_energia": formValues.observaciones_energia,
      "observaciones_telefono": formValues.observaciones_telefono,
      "observaciones_internet": formValues.observaciones_internet,
      "observaciones_iluminacion": formValues.observaciones_iluminacion,
      "observaciones_alcantarillado": formValues.observaciones_alcantarillado,

      "constructor": formValues.constructor,
      "obra_basica_inicial": formValues.obra_basica_inicial,

      "norma_retie": formValues.norma_retie,
      "norma_nsr": formValues.norma_nsr,
      "sistema_ahorro_energia": formValues.sistema_ahorro_energia,
      "sistema_ahorro_agua": formValues.sistema_ahorro_agua,
    }

    if(this.fecha_elaboracion){
      formData = {
        ...formData,
        "fecha_elaboracion": this.getDateFormat(this.fecha_elaboracion)
      }
    }

    if(this.disciplines.length){
      const diciplinesIds = this.getDisciplinesId(this.disciplines)
      /*diciplinesIds.forEach(item => {
        formData.disciplinas = [item];
      })*/
      formData.disciplinas = diciplinesIds;
    }

    if(this.fecha_construccion){
      formData = {
        ...formData,
        "fecha_construccion": this.getDateFormat(this.fecha_construccion),
      }
    }

    if(this.interventions.length){
      formData.intervencion_id = [];
      formData.intervencion_anio = [];
      formData.intervencion_contratista = [];
      formData.intervencion_numero_contrato = [];
      formData.intervencion_descripcion = [];

      this.interventions.forEach(item => {
        item.id ? 
        formData.intervencion_id.push(item.id) : formData.intervencion_id.push("");
        formData.intervencion_anio.push(parseInt(item.anio));
        formData.intervencion_contratista.push(item.contratista);
        formData.intervencion_numero_contrato.push(parseInt(item.numero_contrato));
        formData.intervencion_descripcion.push(item.descripcion);
      })
    }

    /*if(this.interventions.length){
      this.interventions.forEach(item => {
        item.id ? 
        formData.intervencion_id = [item.id] : formData.intervencion_id = [];

        formData.intervencion_anio = [item.anio];
        formData.intervencion_contratista = [item.contratista];
        formData.intervencion_numero_contrato = [item.numero_contrato];
        formData.intervencion_descripcion = [item.descripcion];
      })
    }*/
  
    /*formData.intervencion_id = [13, ""];
    formData.intervencion_anio = [2005, 2010];
    formData.intervencion_contratista = ['contratista', 'nuevo contratista'];
    formData.intervencion_numero_contrato = [1223, 34567];
    formData.intervencion_descripcion = ['xyz', 'abc'];*/

    console.log('formData', formData);
    
    return formData;
  }

  save() {
    this.isLoadingSave = true;
    //console.log('las disciplinas guardadas', this.disciplines);
    //console.log('id de las diciplinas guardadas', this.getDisciplinesId(this.disciplines))
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    this.id ? this.editScenario() : this.createScenario();
  }

  createScenario() {
    const scenario = this.buildBodyCreate(); 

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

  editScenario() {
    const scenario = this.buildBodyUpdate()
    this._scenarios.updateScenario(scenario, this.id).subscribe(
      (resp: any) => {
        console.log('scenario updated', resp);
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

  goBack(){
    this._location.back()
  }

  saveInterventions(event){
    this.interventions = event;
    //console.log('interventions', this.interventions);
    
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  // Chips methods
  add(event: any): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.disciplines.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.discipline.setValue(null);    
  }

  remove(intem: string): void {
    const index = this.disciplines.indexOf(intem);

    if (index >= 0) {
      this.disciplines.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.disciplines.push(event.option.viewValue);
    this.disciplineInput.nativeElement.value = '';
    this.discipline.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allDisciplines.filter(item => item.toLowerCase().includes(filterValue));
  }

}
