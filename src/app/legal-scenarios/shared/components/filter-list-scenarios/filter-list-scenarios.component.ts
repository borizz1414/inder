import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ScenariosService } from 'src/app/core/services/scenarios.service';

@Component({
  selector: 'app-filter-list-scenarios',
  templateUrl: './filter-list-scenarios.component.html',
  styleUrls: ['./filter-list-scenarios.component.scss']
})
export class FilterListScenariosComponent implements OnInit {
  filterScenario = new FormControl('Nombre');
  valueSearch = new FormControl('');
  neighborhood = new FormControl('');
  neighborhoodOptions;
  @Output() eventFilter = new EventEmitter()
  
  constructor(private _fb : FormBuilder,private _scenarios: ScenariosService) { }

  ngOnInit(): void {
    this.fetchNeighborhoodOptions()
  }
  keyUpSearch(){
    let filters = {
      type:this.filterScenario.value.toLowerCase(),
      value:this.valueSearch.value
    }
    console.log(this.valueSearch.value)
    this.eventFilter.emit(filters);
    return filters;
  }
  changeFilter(){
    let valueFilter = this.filterScenario.value.toLowerCase()
      if(valueFilter == 'visualización si') {
        this.eventFilter.emit({visualizacion:true});
        console.log(valueFilter)
      }else if(valueFilter == 'visualización no') {
        this.eventFilter.emit({visualizacion:false});
        console.log(valueFilter)
      }else{
        this.eventFilter.emit('reset');
      }
  }
  changeNeighborhood(){
    this.eventFilter.emit({barrio:this.neighborhood.value});
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
}
