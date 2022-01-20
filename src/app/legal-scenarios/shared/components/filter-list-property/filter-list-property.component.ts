import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-list-property',
  templateUrl: './filter-list-property.component.html',
  styleUrls: ['./filter-list-property.component.scss']
})
export class FilterListPropertyComponent implements OnInit {
  filterScenario = new FormControl('Nombre');
  valueSearch = new FormControl('');
  @Output() eventFilter = new EventEmitter()

  constructor(private _fb : FormBuilder) { }

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
}

