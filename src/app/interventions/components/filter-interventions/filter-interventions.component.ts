import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ScenariosService } from 'src/app/core/services/scenarios.service';

@Component({
  selector: 'app-filter-interventions',
  templateUrl: './filter-interventions.component.html',
  styleUrls: ['./filter-interventions.component.scss']
})
export class FilterInterventionsComponent implements OnInit {

  filterInterventions = new FormControl('seleccionar');
  nameScenario = new FormControl('');
  neighborhood = new FormControl('');
  filterDateStart = new FormControl('');
  filterDateEnd= new FormControl('');
  neighborhoodOptions;
  @Output() eventFilter = new EventEmitter()
  @Input() type;
  constructor(private _fb : FormBuilder,private _scenarios: ScenariosService) { }

  ngOnInit(): void {
    this.fetchNeighborhoodOptions()
    this.changeValueDate();
 


  }
  keyUpSearch(){
    let filters = {
      type:this.filterInterventions.value.toLowerCase(),
      value:this.nameScenario.value
    }
    console.log(this.nameScenario.value)
    this.eventFilter.emit(filters);
    return filters;
  }
  changeStatus(value){
    this.eventFilter.emit({estado:value});
  }
  changeFilter(){
    this.eventFilter.emit({type:''});
  }
  changeDate(type){
    console.log(type)
  }
  changeNeighborhood(){
    this.eventFilter.emit({comuna:this.neighborhood.value});
  }
  fetchNeighborhoodOptions() {
    this._scenarios.getNeighborhoodOptions(false).subscribe(
      (resp: any) => {
          this.neighborhoodOptions = resp.data;
      },
      (err: any) => console.log(err),
      () => console.log(3)
    );
  }
  changeValueDate(){
    let dateStart;
    let dateEnd;
    let params;
   
    this.filterDateStart.valueChanges.subscribe((value) => {
       dateStart = moment(value).format('YYYY-MM-DD')
      params = {...params,fecha_inicio:`${value.year}-${value.month}-${value.day}`};
        this.eventFilter.emit(params);
    });
    this.filterDateEnd.valueChanges.subscribe((value) => {
      console.log(value,'value filterDateEnd')
     dateEnd = moment(value).format('YYYY-MM-DD')
     params = {...params,fecha_fin:`${value.year}-${value.month}-${value.day}`};
      this.eventFilter.emit(params);
    });
    
  }
}
