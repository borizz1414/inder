import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from "moment";

import { ScenariosService } from 'src/app/core/services/scenarios.service';
import { MaintenanceService } from 'src/app/maintenance/services/maintenance.service';

@Component({
  selector: 'app-filter-list-maintenance',
  templateUrl: './filter-list-maintenance.component.html',
  styleUrls: ['./filter-list-maintenance.component.scss']
})
export class FilterListMaintenanceComponent implements OnInit {

  filterSelect = new FormControl('');
  valueSearch = new FormControl('');
  neighborhood = new FormControl('Seleccionar');
  state = new FormControl('Seleccionar');
  date = new FormControl('');

  neighborhoodOptions: any = [];
  stateOptions: any = [];
  loadingOptions: boolean = false;

  @Output() eventFilter = new EventEmitter()
  @Input() type;

  constructor(private _scenarios: ScenariosService, private _maintenance: MaintenanceService) { }

  ngOnInit(): void {
    this.changeDate();
  }

  keyUpSearch(){
    console.log('nombre value search', this.valueSearch.value)
    this.eventFilter.emit({ nombre: this.valueSearch.value });
  }

  changeFilter(){
    console.log('filter value', this.filterSelect.value);
    
    if(this.filterSelect.value === 'Comuna' && this.neighborhoodOptions.length === 0){
      this.fetchNeighborhoodOptions()
    }

    if(this.filterSelect.value === 'Estado' && this.stateOptions.length === 0){
      this.fetchStateOptions()
    }
  
    if(this.filterSelect.value === 'Nombre'){
      this.keyUpSearch() 
    }
  }

  changeNeighborhood(){
    console.log('barrio value', this.neighborhood.value);
    this.eventFilter.emit({ comuna: this.neighborhood.value });
  }

  fetchNeighborhoodOptions() {
    this.loadingOptions = true;
    this._scenarios.getNeighborhoodOptions().subscribe(
      (resp: any) => {
          this.neighborhoodOptions = resp.data;
          this.loadingOptions = false;
      },
      (err: any) => console.log(err),
    );
  }

  changeState(){
    console.log('state value', this.state.value);
    this.eventFilter.emit({ mantenimiento_estado: this.state.value });
  }

  fetchStateOptions() {
    this.loadingOptions = true;
    this._maintenance.getStateOptions().subscribe(
      (resp: any) => {
          this.stateOptions = resp.data;
          this.loadingOptions = false;
      },
      (err: any) => console.log(err),
    );
  }

  changeDate(){
    this.date.valueChanges.subscribe((value) => {
      console.log('date value', value);

      const { year, month, day } = value;
      const stringDate = `${year}-${month}-${day}`;
      const updateDate = moment(stringDate).format("YYYY-MM-DD");

      console.log('updateDate', updateDate);
      this.eventFilter.emit({ mantenimiento_actualizacion: updateDate });
    });
  }
}
