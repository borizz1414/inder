import { Component, OnInit, Renderer2, ViewChild, ElementRef,  AfterViewInit, OnDestroy } from '@angular/core';
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
import { UserService } from 'src/app/user-profile/services/user.service';
import { environment } from "src/environments/environment";
import { NotifierService } from 'src/app/core/services/notifier.service';
import KTWizard from 'src/assets/js/components/wizard';
import { KTUtil } from 'src/assets/js/components/util';

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
  isLoadingSave : boolean = false;
  loadingData: boolean = false;
  isVereda : boolean = false;
  documentFile: any = null;
  documentFileName: string = "";
  divisions: any[] = [];
  divisionsSaved: any[] = [];
  scenarioData: any = null;
  gestorPrincipal = null;
  tendencia = null;

  emptyElement: any;
  showAddAnother = false;
  isDetail = false;
  hasCollapsed = false;
  previusStep: any = null;

  horarios: any = [
    {
      nombre_dia: 'lunes',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'martes',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'miercoles',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'jueves',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'viernes',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'sabado',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    },
    {
      nombre_dia: 'domingo',
      hora_inicial_manana: null,
      hora_final_manana: null,
      hora_inicial_tarde: null,
      hora_final_tarde: null,
    }
  ]
  meridian: boolean = true;
  noMeridian: boolean = false;
  spinners: boolean = false;

  municipioOptions = [];
  barrioOptions = [];
  veredaOptions = [];
  tipoEquipamientoOptions = [];
  tendenciasOptions = [];
  mainManagerOptions = [];
  divisionCategoryOptions = [];

  disciplinesSelected = [];
  typeReservationsSelected = [];
  secondaryManagersSelected = [];

  isLoadingManagers2: boolean = false;
  isLoadingManager1: boolean = false;
  selectOptions: any = {
    divisionCategoryOptions: [],
    disciplinesOptions: [],
    tendenciasOptions: [],
    typeReservationsOptions: [],
  } 

  map: Mapboxgl.Map;
  marker: Mapboxgl.Marker;
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;

  @ViewChild('wizard', { static: true }) el: ElementRef;
  wizard: any;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  disciplina = new FormControl();
  filteredDisciplines: any[] = [];
  disciplines: any[] = [];
  //allDisciplines: any[] = [];
  @ViewChild('disciplineInput') disciplineInput: ElementRef<HTMLInputElement>;

  reservacion = new FormControl();
  filteredReservations: any[];
  reservations: any[] = [];
  //allReservations: any[] = [];
  @ViewChild('reservationInput') reservationInput: ElementRef<HTMLInputElement>;

  gestor_secundario = new FormControl();
  filteredSecondaryManagers: any[] = [];
  secondaryManagers: any[] = [];
  //allSecondaryManagers: any[] = [];
  @ViewChild('secondaryManagerInput') secondaryManagerInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder, 
    private activeRoute: ActivatedRoute, 
    private _location: Location,
    private renderer2: Renderer2,
    private _scenarios : ScenariosService,
    private _notifier: NotifierService,
    private _users : UserService,
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
      //console.log('id de escenario', this.id);
    });

    if(this.id){
      this.getAll()
    }else{
      this.initializeForm()
    }
  }

  ngAfterViewInit(): void {
    // Initialize form wizard
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1
    });

    // Validation before going to next page
    this.wizard.on('beforeNext', (wizardObj) => {
      // https://angular.io/guide/forms
      // https://angular.io/guide/form-validation

      // validate the form and use below function to stop the wizard's previusStep
      // wizardObj.stop();
    });

    // Change event
    this.wizard.on('change', () => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }

  ngOnDestroy() {
    this.wizard = undefined;
    this.map = undefined;
    this.marker = undefined;
  }

  getAll(): void {
    this.isLoadingSubject.next(true);
    this.loadingData = true;
    const params = {}

    this._scenarios.getScenario(this.id).subscribe(
      (resp: any) => {
        //console.log('escenario data', resp.data);

        if(resp.data){
          this.filterAllData(resp.data);
        }else{
          this.loadingData = false;
          this.initializeForm();
        }
      },
      (err: any) => {
        this.loadingData = false;
        this._notifier.showNotification(
          "Error al obtener los datos del escenario",
          "error"
        )
      }
    ),
    (resp: any) => {
      if(resp.data){
        this.filterAllData(resp.data)
      }else{
        this.loadingData = false;
        this.initializeForm();
      }
    };
  }

  filterAllData(data) {
    if(data){
      this.scenarioData = data;

      if(data?.divisiones.length){
        this.divisions = data.divisiones.map(item => ({
          ...item,
          categoria_division: item?.categoria_division_id,
          division: item?.nombre,
          aprobacion_reserva: item?.necesita_aprobacion,
          disciplinas: item?.disciplinas_division,
          tendencias: item?.tendencias_division,
          tipoReservas: item?.tipo_reserva_division,
        }))
        this.divisionsSaved = [...this.divisions];
      }

      console.log('divisions', this.divisions);
      console.log('divisionsSaved', this.divisionsSaved);

      this.loadFormValues(data);
    }
  }

  loadFormValues(data){
    // Step 1
    this.formGroup.get('nombre_escenario').setValue(data?.nombre || '');
    this.formGroup.get('telefono').setValue(data?.telefono || '');
    this.formGroup.get('email').setValue(data?.email || '');
    this.formGroup.get('tipo_equipamiento_id').setValue(data?.tipo_equipamiento_id || '');
    this.formGroup.get('municipio_id').setValue(data?.municipio_id || '');
    this.formGroup.get('barrio_id').setValue(data?.barrio_id || '');
    this.formGroup.get('direccion').setValue(data?.direccion || '');
    this.formGroup.get('latitud').setValue(data?.latitud || '');
    this.formGroup.get('longitud').setValue(data?.longitud || '');
    this.formGroup.get('informacion_reserva').setValue(data?.informacionreserva || '');

    // Step 2
    this.formGroup.get('necesita_restricciones').setValue(data?.divisiones.length ? 'true' : 'false');
    this.formGroup.get('horario_division').setValue(`${data?.horario_division}` || '');
    this.formGroup.get('normas_escenario').setValue(data?.normaescenario || '');

    if(data?.disciplinas.length){
      this.disciplinesSelected = [...data.disciplinas]
      this.disciplines = this.disciplinesSelected.map(item => item.nombre)
      this.selectOptions.disciplinesOptions = this.disciplinesSelected;
    }

    if(data?.tipo_reservas.length){
      this.typeReservationsSelected = [...data.tipo_reservas]
      this.reservations = this.typeReservationsSelected.map(item => item.nombre)
      this.selectOptions.typeReservationsOptions = this.typeReservationsSelected;
    }

    if(data?.tendencias.length){
      this.tendencia = data.tendencias[0]
      this.formGroup.get('tendencias').setValue(this.tendencia.nombre)
      this.selectOptions.tendenciasOptions = [this.tendencia];
    }

    this.horarios.forEach(element => {
      const timeInicialManana = data[`hora_inicial_${element.nombre_dia}`]
      const timeFinalManana = data[`hora_final_${element.nombre_dia}`]
      const timeInicialTarde = data[`hora_inicial2_${element.nombre_dia}`]
      const timeFinalTarde = data[`hora_final2_${element.nombre_dia}`]

      element.hora_inicial_manana = {
        hour: parseInt(timeInicialManana.slice(0, 2)),
        minute: parseInt(timeInicialManana.slice(3, 5)),
      };

      element.hora_final_manana = {
        hour: parseInt(timeFinalManana.slice(0, 2)),
        minute: parseInt(timeFinalManana.slice(3, 5)),
      };

      element.hora_inicial_tarde = {
        hour: parseInt(timeInicialTarde.slice(0, 2)) - 12,
        minute: parseInt(timeInicialTarde.slice(3, 5)),
      };

      element.hora_final_tarde = {
        hour: parseInt(timeFinalTarde.slice(0, 2)),
        minute: parseInt(timeFinalTarde.slice(3, 5)),
      };
    });

    if(data?.gestores.length){    
      data.gestores.forEach(element => {
        if(element.principal){
          this.gestorPrincipal = element
          this.formGroup.get('gestor_principal').setValue(this.gestorPrincipal.nombre)
        }else{
          this.secondaryManagersSelected.push(element)
          this.secondaryManagers.push(`${element.nombre} ${element.apellido}`)
        }
      });
    }

    // Step 3
    this.formGroup.get('ancho').setValue(data?.ancho || '');
    this.formGroup.get('largo').setValue(data?.largo || '');
    this.documentFileName = data?.imagen_escenario_dividido ? `Imagen.${data?.imagen_escenario_dividido.split(".")[1]}` : ''

    // Divisiones fue seteado antes en el método filterAllData

    this.isLoadingSubject.next(false);
    this.loadingData = false;
  }

  // Colapsable Methods --------------------------------

  updateDataChild(idScenario){
    if(idScenario && !this.id) this.id = idScenario;

    if(this.id){
      this.getAll()
    }
  }

  initializeForm() {
    this.emptyElement = {
      id: "",
    };
    this.divisions.push(this.emptyElement);
    console.log('divisions', this.divisions);
  }

  // Se ejecuta cuando se termina de crear o editar el formulario hijo
  saveChild() {
    this.showAddAnother = true;
  }

  formCollapsed(isCollapsed: boolean) {
    this.showAddAnother = isCollapsed;
    this.hasCollapsed = isCollapsed;
  }

  addNewForm() {
    //this.fetchOptions()
    this.initializeForm();
    this.showAddAnother = false;
  }

  showDetail(isDetail: boolean) {
    this.isDetail = isDetail;
  }

  removeForm(indexForm){
    this.divisions.splice(indexForm, 1);
    this.divisionsSaved.splice(indexForm, 1);

    console.log('divisiones', this.divisions)
    console.log('divisiones guardadas', this.divisionsSaved)
  }

  // Form methods --------------------------------

  loadForm() {
    this.formGroup = this.fb.group({
      // Step 1
      nombre_escenario: ['', [Validators.required]],
      telefono: [''],
      email: ['', Validators.email],
      tipo_equipamiento_id:[''],
      municipio_id: ['', Validators.required],
      barrio_id: [''],
      vereda: [''],
      direccion: ['', [Validators.required]],
      latitud: [''],
      longitud: [''],
      informacion_reserva: [''],
      // Step 2
      necesita_restricciones: ['true'],
      tendencias: [''],
      horario_division: ['false'],
      gestor_principal: [''],
      normas_escenario: [''],
      // Step 3
      ancho: ['', Validators.required],
      largo: ['', Validators.required],
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

  getTendenciaId(option){
    this.tendencia = option
    this.selectOptions.tendenciasOptions = [option];
  }

  getManagerNumberId(option){
    this.gestorPrincipal = option;
    this.formGroup.get('gestor_principal').setValue(`${option.numero_identificacion} - ${option.nombre} ${option.apellido}`)
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

  changeNeedRestrictions(){
    if(this.formGroup.value.necesita_restricciones === 'true'){
      this.initializeForm();
      console.log('divisiones', this.divisions)
      console.log('divisiones guardadas', this.divisionsSaved)
    }else{
      this.divisions = []
      this.divisionsSaved = []
      console.log('divisiones', this.divisions)
      console.log('divisiones guardadas', this.divisionsSaved)
    }
  }

  onChangeFile(event: any) {
    const file = event.target.files[0];

    this.documentFile = file;
    this.documentFileName = file.name;
  }

  hideAnotherButton(){
    this.previusStep = this.wizard.getStep();

    if(this.divisionsSaved.length){
      this.divisions = [...this.divisionsSaved]
    }

    console.log('divisiones', this.divisions)
    console.log('divisiones guardadas', this.divisionsSaved)

    this.showAddAnother = false;
    this.fetchOptions()
  }

  showAnotherButton(){
    this.previusStep = this.wizard.getStep();

    if(this.divisionsSaved.length){
      this.divisions = [...this.divisionsSaved]
    }

    console.log('divisiones', this.divisions)
    console.log('divisiones guardadas', this.divisionsSaved)

    if(this.previusStep === 2 && this.hasCollapsed){
      this.showAddAnother = true;
    }
    this.fetchOptions()
  }

  // Save Methods ------------------------------------------------

  getHourFormat(time, isAfternoon = false) {
    const { hour, minute } = time;
    const stringTime = `${isAfternoon ? hour + 12 : hour}:${minute}`;
    const stringDate = `1950-01-1`; // Any date
    const newHour = moment(`${stringDate} ${stringTime}`).format('HH:mm').toLocaleLowerCase()
    
    //console.log('newHour', newHour);
    
    return newHour;
  }

  buildBodyCreate(){
    const formValues = this.formGroup.value;
    let formData: any = new FormData();  

    // Step 1
    formData.append("nombre_escenario", formValues.nombre_escenario);
    formData.append("telefono", formValues.telefono);
    formData.append("email", formValues.email);
    formData.append("tipo_equipamiento_id", formValues.tipo_equipamiento_id);
    formData.append("municipio_id", formValues.municipio_id);
    formData.append("barrio_id", this.isVereda ? formValues.vereda : formValues.barrio_id);    
    formData.append("direccion", formValues.direccion);
    formData.append("latitud", formValues.latitud);
    formData.append("longitud", formValues.longitud);
    formData.append("informacion_reserva", formValues.informacion_reserva);

    // Step 2
    if(this.disciplinesSelected.length){
      this.disciplinesSelected.forEach(item => {
        formData.append("disciplinas[]", item.id);
      })
    }

    if(this.typeReservationsSelected.length){
      this.typeReservationsSelected.forEach(item => {
        formData.append("tipo_reservas[]", item.id);
      })
    }

    if(this.tendencia){
      formData.append("tendencias[]", this.tendencia.id);
    }

    this.horarios.forEach((element) => {
      formData.append(`hora_inicial_${element.nombre_dia}`, this.getHourFormat(element.hora_inicial_manana));
      formData.append(`hora_final_${element.nombre_dia}`, this.getHourFormat(element.hora_final_manana));
      formData.append(`hora_inicial2_${element.nombre_dia}`, this.getHourFormat(element.hora_inicial_tarde, true));
      formData.append(`hora_final2_${element.nombre_dia}`, this.getHourFormat(element.hora_final_tarde));
    });

    formData.append("horario_division", formValues.horario_division);

    if(this.gestorPrincipal){
      formData.append("gestor_principal", this.gestorPrincipal.id);
    }

    if(this.secondaryManagersSelected.length){
      this.secondaryManagersSelected.forEach(item => {
        formData.append("gestores_secundarios[]", item.id);
      })
    }

    formData.append("normaescenario", formValues.normas_escenario);

    // Step 3
    formData.append("ancho", formValues.ancho);
    formData.append("largo", formValues.largo);
    formData.append("imagen_escenario_dividido", this.documentFile);

    // Agrega divisiones solo si necesita restricciones 
    if(this.divisionsSaved.length && this.formGroup.value.necesita_restricciones === 'true'){
      this.divisionsSaved.forEach((item, index) => {
        
        formData.append("division_division_id[]", item.id || "")
        formData.append("division_categoria_division_id[]", item.categoria_division)
        formData.append("division_nombre[]", item.division)
        formData.append("division_edad_minima[]", item.edad_minima)
        formData.append("division_necesita_aprobacion[]", item.aprobacion_reserva)

        if(item.disciplinas.length){
          item.disciplinas.forEach((element, i) => {
            formData.append(`division_disciplinas[${index}][${i}]`, element.id)
          });
        }

        formData.append(`division_tendencias[${index}][0]`, item.tendencias[0].id)

        item.horarios.forEach((element) => {
          formData.append(`division_hora_inicial_${element.nombre_dia}[]`, 
            this.getHourFormat(element.hora_inicial_manana))
          formData.append(`division_hora_final_${element.nombre_dia}[]`, 
            this.getHourFormat(element.hora_final_manana))
          formData.append(`division_hora_inicial2_${element.nombre_dia}[]`,
            this.getHourFormat(element.hora_inicial_tarde, true))
          formData.append(`division_hora_final2_${element.nombre_dia}[]`, 
            this.getHourFormat(element.hora_final_tarde))
        });

        if(item.tipoReservas.length){
          item.tipoReservas.forEach((element, i) => {
            formData.append("reserva_reserva_division[]", i+1)
            formData.append("division_division_auxiliar_id[]", i+1)
            
            formData.append("reserva_tipo_reserva[]", element.tipo_reserva);
            formData.append("reserva_tiempo_minimo[]", element.bloque_minimo_reserva);
            formData.append("reserva_tiempo_maximo[]", element.bloque_maximo_reserva);
            formData.append("reserva_bloque_tiempo[]", element.bloque_tiempo);
            formData.append("reserva_usuarios_minimos[]", element.cantidad_minima_usuarios);
            formData.append("reserva_usuarios_maximos[]", element.cantidad_maxima_usuarios);
            formData.append("reserva_dias_previos_reserva[]", element.dias_previos);
          });

        }else{
          formData.append("division_division_auxiliar_id[]", index+1)
        }

      })
    }

    //Display the values
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ' - ' + pair[1]);
    }

    return formData;
  }

  buildBodyUpdate(){
    const formValues = this.formGroup.value;
    let formData: any = {};

    // Step 1
    formData = {
      "nombre_escenario": formValues.nombre_escenario,
      "telefono": formValues.telefono,
      "email": formValues.email,
      "tipo_equipamiento_id": formValues.tipo_equipamiento_id,
      "municipio_id": formValues.municipio_id,
      "barrio_id": this.isVereda ? formValues.vereda : formValues.barrio_id,
      "direccion": formValues.direccion,
      "latitud": formValues.latitud,
      "longitud": formValues.longitud,
      "informacion_reserva": formValues.informacion_reserva,
    }

    // Step 2
    if(this.disciplinesSelected.length){
      const disciplinas = this.disciplinesSelected.map(item => item.id)
      formData = {...formData, disciplinas }
    }

    if(this.typeReservationsSelected.length){
      const tipo_reservas = this.typeReservationsSelected.map(item => item.id)
      formData = {...formData, tipo_reservas }
    }

    if(this.tendencia){
      formData = {...formData, tendencias: [this.tendencia.id] }
    }

    this.horarios.forEach((element) => {    
      formData[`hora_inicial_${element.nombre_dia}`] = this.getHourFormat(element.hora_inicial_manana)
      formData[`hora_final_${element.nombre_dia}`] = this.getHourFormat(element.hora_final_manana)
      formData[`hora_inicial2_${element.nombre_dia}`] = this.getHourFormat(element.hora_inicial_tarde, true)
      formData[`hora_final2_${element.nombre_dia}`] = this.getHourFormat(element.hora_final_tarde)
    });

    formData = { ...formData, "horario_division": formValues.horario_division }

    if(this.gestorPrincipal){
      formData = {...formData, gestor_principal: this.gestorPrincipal.id }
    }

    if(this.secondaryManagersSelected.length){
      const gestores_secundarios = this.secondaryManagersSelected.map(item => item.id)
      formData = { ...formData, gestores_secundarios }
    }

    formData = { ...formData, "normaescenario": formValues.normas_escenario }

    // Step 3
    formData = { 
      ...formData,
      "ancho": formValues.ancho,
      "largo": formValues.largo 
    }

    if(this.divisionsSaved.length && this.formGroup.value.necesita_restricciones === 'true'){
      let division_disciplinas = []
      let division_tendencias = []

      this.divisionsSaved.forEach((element, index) => {
        division_disciplinas[index] = []
        division_tendencias[index] = []
      });

      formData.division_division_id = [],
      formData.division_division_auxiliar_id = []
      formData.division_categoria_division_id = []
      formData.division_nombre = []
      formData.division_edad_minima = []
      formData.division_necesita_aprobacion = []
      formData.division_disciplinas = division_disciplinas,
      formData.division_tendencias = division_tendencias,
      formData.division_hora_inicial_lunes = []
      formData.division_hora_final_lunes = []
      formData.division_hora_inicial_martes = []
      formData.division_hora_final_martes = []
      formData.division_hora_inicial_miercoles = []
      formData.division_hora_final_miercoles = []
      formData.division_hora_inicial_jueves = []
      formData.division_hora_final_jueves = []
      formData.division_hora_inicial_viernes = []
      formData.division_hora_final_viernes = []
      formData.division_hora_inicial_sabado = []
      formData.division_hora_final_sabado = []
      formData.division_hora_inicial_domingo = []
      formData.division_hora_final_domingo = []
      formData.division_hora_inicial2_lunes = []
      formData.division_hora_final2_lunes = []
      formData.division_hora_inicial2_martes = []
      formData.division_hora_final2_martes = []
      formData.division_hora_inicial2_miercoles = []
      formData.division_hora_final2_miercoles = []
      formData.division_hora_inicial2_jueves = []
      formData.division_hora_final2_jueves = []
      formData.division_hora_inicial2_viernes = []
      formData.division_hora_final2_viernes = []
      formData.division_hora_inicial2_sabado = []
      formData.division_hora_final2_sabado = []
      formData.division_hora_inicial2_domingo = []
      formData.division_hora_final2_domingo = []
      formData.reserva_reserva_division = []
      formData.reserva_tipo_reserva = []
      formData.reserva_tiempo_minimo = []
      formData.reserva_tiempo_maximo = []
      formData.reserva_bloque_tiempo = []
      formData.reserva_usuarios_minimos = []
      formData.reserva_usuarios_maximos = []
      formData.reserva_dias_previos_reserva = []

      this.divisionsSaved.forEach((item, index) => {
        formData.division_division_id.push(item.id || "")
        formData.division_categoria_division_id.push(item.categoria_division)
        formData.division_nombre.push(item.division)
        formData.division_edad_minima.push(item.edad_minima)
        formData.division_necesita_aprobacion.push(item.aprobacion_reserva)

        if(item.disciplinas.length){
          item.disciplinas.forEach((element, i) => {            
            formData.division_disciplinas[index].push(null)
            formData.division_disciplinas[index][i] =  element.id 
          });
        }

        formData['division_tendencias'][index][0] = item.tendencias[0].id

        item.horarios.forEach((element) => {
          formData[`division_hora_inicial_${element.nombre_dia}`].push(this.getHourFormat(element.hora_inicial_manana))
          formData[`division_hora_final_${element.nombre_dia}`].push(this.getHourFormat(element.hora_final_manana))
          formData[`division_hora_inicial2_${element.nombre_dia}`].push(this.getHourFormat(element.hora_inicial_tarde, true))
          formData[`division_hora_final2_${element.nombre_dia}`].push(this.getHourFormat(element.hora_final_tarde))
        });

        if(item.tipoReservas.length){
          item.tipoReservas.forEach((element, i) => {
            formData["reserva_reserva_division"].push(i+1)
            formData["division_division_auxiliar_id"].push(i+1)
            
            formData["reserva_tipo_reserva"].push(element.tipo_reserva);
            formData["reserva_tiempo_minimo"].push(element.bloque_minimo_reserva);
            formData["reserva_tiempo_maximo"].push(element.bloque_maximo_reserva);
            formData["reserva_bloque_tiempo"].push(element.bloque_tiempo);
            formData["reserva_usuarios_minimos"].push(element.cantidad_minima_usuarios);
            formData["reserva_usuarios_maximos"].push(element.cantidad_maxima_usuarios);
            formData["reserva_dias_previos_reserva"].push(element.dias_previos);
          });

        }else{
          formData["division_division_auxiliar_id"].push(index+1)
        }
      })
    }

    console.log('formData', formData);
    
    return formData;
  }

  save() {
    // console.log('form ', this.formGroup.value);
    // console.log('horarios', this.horarios);
    // console.log('disciplinas ', this.disciplinesSelected);
    // console.log('reservaciones', this.typeReservationsSelected);
    // console.log('gestor principal', this.gestorPrincipal);
    // console.log('tendencias', this.tendencia);
    // console.log('gestores secundarios', this.secondaryManagersSelected);
    // console.log('documentFile', this.documentFile);
    console.log('divisionsSaved', this.divisionsSaved);
    
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      console.log('form invalid');
      return;
    }
    this.isLoadingSave = true;

    this.id ? this.editScenario() : this.createScenario();
  }

  createScenario() {
    const scenario = this.buildBodyCreate(); 
    this._scenarios.createScenario(scenario).subscribe(
      (resp: any) => {
        console.log("scenario created ", resp);
        this._notifier.showNotification("", "success");
        this.isLoadingSave = false;
        this.goBack();
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
        this.isLoadingSave = false;
        this.goBack();
      },
      (err: any) => {
        console.log(err);
        this._notifier.showNotification(err, "error");
        this.isLoadingSave = false;
      }
    );
  }

  saveDivisions(event){
    this.divisionsSaved[event.index] = {...event}; // Recibiendo la división con data 
    // console.log('obteniendo división', event);
    // console.log('divisiones', this.divisions)
    // console.log('divisiones guardadas', this.divisionsSaved)
  }

  // Misc methods -------------------------------------------
  goBack(){
    this._location.back()
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  // Chips methods ------------------------------------------

  add(
    event: any, 
    chipList: string, 
    tag: string, 
    formControl: string,
  ): void {
    const value = (event.value || '').trim();

    // Add our item
    if (value) {
      this[chipList].push(value);
    }

    // Clear the input value
    event[tag]!.clear();

    this[formControl].setValue(null);
  }

  remove(item: string, chipList: string): void {
    const index = this[chipList].indexOf(item);

    if (index >= 0) {
      this[chipList].splice(index, 1);
    }
  }

  selected(
    event: MatAutocompleteSelectedEvent, 
    chipList: string, 
    tag: string, 
    formControl: string
  ): void {
    this[chipList].push(event.option.viewValue);
    this[tag].nativeElement.value = '';
    this[formControl].setValue(null);
  }

  getOptionsSelected(option, listSelected, formControl){
    this[listSelected].push(option)   
    this[formControl].setValue('');

    this.selectOptions.disciplinesOptions = this.disciplinesSelected;
    this.selectOptions.typeReservationsOptions = this.typeReservationsSelected;
  }

  removeSelected(index, listSelected){
    this[listSelected].splice(index, 1)

    this.selectOptions.disciplinesOptions = this.disciplinesSelected;
    this.selectOptions.typeReservationsOptions = this.typeReservationsSelected;
  }

  // Fetch Methods ----------------------------------------------

  fetchOptions(){
    // Step 1
    if(!this.previusStep){
      this.fetchMunicipioOptions();
      this.fetchBarrioOptions();
      this.fetchTipoEquipamientoOptions();
    }
    // Step 2
    if(this.previusStep === 1){
      //Chips autocomplete
      this.fetchDisciplinaOptions();
      this.fetchReservationsOptions();

      //this.fetchSecondaryManagersOptions();
      this.filterSecondaryManagers();

      // Single autocomplete
      this.fetchTrendsOptions();
      this.filterTrends()

      //this.fetchMainManagerOptions();
      this.filterMainManager();

      // Step 3 
      // Es necesario que estás opciones estén antes de renderizar el paso 3
      this.fetchDivisionCategotyOptions();
    }
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
    this.disciplina.valueChanges.subscribe((value) => {
      if(value) this.fetchDisciplinaOptions(value)
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
        this.filteredDisciplines = resp.data
        this.filterDisciplines()
      }
     }, 
     (err: any) => console.log(err))
  }

  filterReservations(){  
    this.reservacion.valueChanges.subscribe((value) => {
      if(value) this.fetchReservationsOptions(value)
    });
  }

  fetchReservationsOptions(search: string | null = null): any {    
    let params = null;
    if(search !== null){
      params = {
        nombre: search
      }
    }
    this._scenarios.getReservationsOptions(params).subscribe((resp:any) => {
      if(search !== null){
        this.filteredReservations = resp.data
      }else{
        this.filteredReservations = resp.data
        this.filterReservations()
      }
     }, 
     (err: any) => console.log(err))
  }

  filterTrends(){  
    this.formGroup.get("tendencias").valueChanges.subscribe((value) => {
      this.fetchTrendsOptions(value)
    });
  }

  fetchTrendsOptions(search: string = ''): any {    
    let params = {
      nombre: search
    }
    this._scenarios.getTrendsOptions(params).subscribe((resp:any) => {
      this.tendenciasOptions = resp.data;
     }, 
     (err: any) => console.log(err))
  }

  filterMainManager(){  
    this.formGroup.get("gestor_principal").valueChanges.subscribe((value) => {
      this.fetchMainManagerOptions(value)
    });
  }

  fetchMainManagerOptions(search: string = ''): any { 
    let params: any = { select: 'select'};

    const newSearch: any = parseInt(search)
    if(newSearch && search.length > 3){
      this.isLoadingManager1 = true;
      params = {
        ...params,
        numId: parseInt(search),
      }
    }else if(search.length > 3){
      this.isLoadingManager1 = true;
      params = {
        ...params,
        nombre: search,
      }
    }

    if(search.length > 3){
      this._users.getUsersList(params).subscribe((resp:any) => {
        this.mainManagerOptions = resp.data;
        this.isLoadingManager1 = false;
       }, 
       (err: any) => {
         this.isLoadingManager1 = false;
         console.log(err)
       })
    }
  }

  filterSecondaryManagers(){  
    this.gestor_secundario.valueChanges.subscribe((value) => {  
      if(value) this.fetchSecondaryManagersOptions(value)
    });
  }

  fetchSecondaryManagersOptions(search: string = ''): any { 
    let params: any = { select: 'select'};

    const newSearch = parseInt(search)
    if(newSearch && search.length > 3){
      this.isLoadingManagers2 = true;
      params = {
        ...params,
        numId: parseInt(search),
      }
    }else if(search.length > 3){
      this.isLoadingManagers2 = true;
      params = {
        ...params,
        nombre: search,
      }
    }

    if(search.length > 3){
      this._users.getUsersList(params).subscribe((resp:any) => {
        this.filteredSecondaryManagers = resp.data
        this.isLoadingManagers2 = false;
       }, 
       (err: any) => {
         console.log(err)
         this.isLoadingManagers2 = false;
       })
    }
  }

  fetchDivisionCategotyOptions(){
    this._scenarios.getDivisionCategoryOptions().subscribe((resp:any) => {
      this.divisionCategoryOptions = resp.data
      this.selectOptions.divisionCategoryOptions = resp.data;
     }, 
     (err: any) => console.log(err),
    )
  }
}
