import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from "moment";

import { CorrectiveMaintenanceService } from 'src/app/corrective-maintenance/services/corrective-maintenance.service';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {

  filterSelect = new FormControl('');
  valueSearch = new FormControl('');
  date = new FormControl('');
  state = new FormControl('');

  stateOptions: any = [];
  loadingOptions: boolean = false;

  @Output() eventFilter = new EventEmitter()

  constructor(private _maintenance: CorrectiveMaintenanceService) { }

  ngOnInit(): void {
    this.changeDate();
  }

  keyUpSearch(){
    console.log('nombre value search', this.valueSearch.value)
    this.eventFilter.emit({ nombre: this.valueSearch.value });
  }

  changeFilter(){
    console.log('filter value', this.filterSelect.value);

    if(this.filterSelect.value === 'Estado' && this.stateOptions.length === 0){
      this.fetchStateOptions()
    }
  
    if(this.filterSelect.value === 'Nombre'){
      this.keyUpSearch() 
    }
  }

  changeState(){
    console.log('state value', this.state.value);
    this.eventFilter.emit({ estado: this.state.value });
  }

  fetchStateOptions() {
    this.loadingOptions = true;
    this._maintenance.getStateOptions().subscribe(
      (resp: any) => {
          this.stateOptions = resp.data;
          this.loadingOptions = false;
      },
      (err: any) => {
        console.log(err)
        this.loadingOptions = false;
      },
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
