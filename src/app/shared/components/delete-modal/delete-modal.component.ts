import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() config;
  isLoading = false;
  @Output() confirmDelete: EventEmitter<any> = new EventEmitter();

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
    
  }

  delete() {
    this.confirmDelete.emit();
  }

}
