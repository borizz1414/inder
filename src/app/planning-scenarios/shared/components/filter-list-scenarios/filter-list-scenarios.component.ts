import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-list-scenarios',
  templateUrl: './filter-list-scenarios.component.html',
  styleUrls: ['./filter-list-scenarios.component.scss']
})
export class FilterListScenariosComponent implements OnInit {
  filterScenario = new FormControl('Nombre');
  valueSearch = new FormControl('');
  @Output() eventFilter = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
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
        this.keyUpSearch()
      }
  }
}
