import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ScenariosService } from 'src/app/core/services/scenarios.service';

@Component({
  selector: 'app-filter-guarantee',
  templateUrl: './filter-guarantee.component.html',
  styleUrls: ['./filter-guarantee.component.scss']
})
export class FilterGuaranteeComponent implements OnInit {
  filterGuarantee = new FormControl('Nombre');
  valueSearch = new FormControl('');
  neighborhood = new FormControl('');
  filterDate = new FormControl('');
  neighborhoodOptions;
  @Output() eventFilter = new EventEmitter()
  @Input() type;
  constructor(private _fb : FormBuilder,private _scenarios: ScenariosService) { }

  ngOnInit(): void {
    this.fetchNeighborhoodOptions()
    this.filterDate.valueChanges.subscribe((value) => {
      let date = moment(value).subtract(1,'months').format('YYYY-MM-DD')
      this.filterGuarantee.value == 'vencimiento' ? this.eventFilter.emit({garantia_vencimiento:date}) : this.eventFilter.emit({garantia_actualizacion:date});
      
    });

  }
  keyUpSearch(){
    let filters = {
      type:this.filterGuarantee.value.toLowerCase(),
      value:this.valueSearch.value
    }
    console.log(this.valueSearch.value)
    this.eventFilter.emit(filters);
    return filters;
  }
  changeGuarantee(value){
    this.eventFilter.emit({garantia_tipo:value});
  }
  changeFilter(){
    let valueFilter = this.filterGuarantee.value.toLowerCase()
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
}
