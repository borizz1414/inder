import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
  OnChanges,
  EventEmitter,
  Output,
} from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { toInteger } from '../../../theme/core/utils/types-convertion.utils';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: "app-general-table",
  templateUrl: "./general-table.component.html",
  styleUrls: ["./general-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralTableComponent implements OnInit, OnChanges {
  perPageSelect = new FormControl('10')
  paginatorOutput:any = {};
  page = 4;
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  displayedColumns = [];
  isLoading: boolean = false;
  perPageOpt = [10, 50, 100];
  selectionDownload = [];
  paginatorMetronic;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output() childPaginator = new EventEmitter();
  @Output() downloadExcel = new EventEmitter();
  @Output() updateDisplayScenario = new EventEmitter();
  @Output() deleteAction = new EventEmitter();
  @Output() downloadFile = new EventEmitter();


  @Input() cardConfig;
  @Input() dataTable;
  @Input() configColumns;
  @Input() displayElementTable;
  @Input() paginator;
  @Input() configDeleteModal;
  
  constructor(private modalService: NgbModal){

  }
  ngOnInit() {
    this.setTable();

  }

  checkboxTable(row){
    this.selection.toggle(row);
    this.mapSelected()
  }
  eventTrash(event,idScenario){
   if(event ==='trash'){
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.config = this.configDeleteModal;

    modalRef.componentInstance.confirmDelete.subscribe((receivedEntry:any) =>{
      this.deleteAction.emit(idScenario)
      modalRef.close();
    })
   }
  }
  changeDisplay(value, idScenario){
    // console.log('id change display', idScenario)
    // console.log('value change display', value)

    const objEmit = {
      value:value,
      id:idScenario
    }
    this.updateDisplayScenario.emit(objEmit)
  }
  loadPage(event){
    const url =`${this.paginator.path}?page=${event.page}`
    this.paginatorOutput.endpoint = url;
    const numeroRegistro = toInteger(event.pageSize);
    this.paginatorOutput.numero_registros = numeroRegistro;
    this.isLoading = true;
    this.childPaginator.emit(this.paginatorOutput)
  }
  setTable() {
    if (this.dataTable === undefined) return (this.isLoading = true);
    this.isLoading = false;
    this.displayedColumns = this.configColumns.map((col) => col.name);
    this.dataSource.data = this.dataTable;
    this.dataSource.sort = this.sort;
    
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : (this.dataSource.data.forEach((row) => this.selection.select(row)));
 this.mapSelected()
  }
  mapSelected(){
    this.selectionDownload = this.selection.selected.map((element:any) => element.id);
  }
  btnDownload(){
    this.downloadExcel.emit(this.selectionDownload)

  }
  // pagination
  ngOnChanges() {
    this.setTable();
  }
  download(name,url){
    let params = {
      url: url,
      nombre: name,
    }
    this.downloadFile.emit(params);
  }
}
