import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-cumulative-form",
  templateUrl: "./cumulative-form.component.html",
  styleUrls: ["./cumulative-form.component.scss"],
})
export class CumulativeFormComponent implements OnInit {
  @Input() isDetail: boolean;
  @Input() isCollapsed: boolean;
  @Input() isEditing: boolean;
  @Input() data;
  @Input() title;
  @Input() config;
  @Output() collapseEvent: EventEmitter<any> = new EventEmitter();
  @Output() trashEvent: EventEmitter<any> = new EventEmitter();

  varsChild = {
    isEditing: null,
    isCollapsed: null,
    isDetail: null,
  };

  constructor() {}
  ngOnInit(): void {

  }
  setVarsChild(){
    this.varsChild.isEditing = this.isEditing;
    this.varsChild.isCollapsed = this.isCollapsed;
    this.varsChild.isDetail = this.isDetail;
  }
  detailVisible() {
    this.isEditing = false;
    if (this.isCollapsed) this.isCollapsed = false;
    this.toggleDetail();
  }
  toggleDetail() {
    this.isDetail ? this.isCollapsed = true : this.isCollapsed = false;
    this.isDetail = !this.isDetail;
    this.setVarsChild()
    this.collapseEvent.emit(this.varsChild);
  }
  delete(value) {
    this.trashEvent.emit(value)
  }
  edit() {
    this.isEditing = true;
    this.isCollapsed = !this.isCollapsed;
    // this.idScenario == undefined ? this.toggleCollapse() : this.isCollapsed = !this.isCollapsed;
    // this.isCollapsed= false;
    // this.isEditing ? this.isCollapsed = true : this.isCollapsed = false;
      
    // this.isEditing = !this.isEditing;
    // if (this.isCollapsed) {
      // console.log("this.data", this.data);
      // if (this.idScenario) {
        // if (this.data.tipocontrato.id == 2) this.changeDependence();
      // }
      // this.isCollapsed = false;
    // }
    this.setVarsChild()
    this.collapseEvent.emit(this.varsChild);
    // this.filterScenarioOptions();
    // this.toggleDetail()
  }
  changeDetailToEdit() {
    this.isEditing ? this.isCollapsed = true : this.isCollapsed = false;
    this.isEditing = true;
    this.isDetail = false;
    this.setVarsChild()
    this.collapseEvent.emit(this.varsChild);
  }
}
