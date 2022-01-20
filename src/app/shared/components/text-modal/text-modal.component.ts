import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.scss']
})
export class TextModalComponent implements OnInit {

  @Input() config;
  isLoading = false;
  textModal = new FormControl();
  @Output() confirmText: EventEmitter<any> = new EventEmitter();

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  send() {
    this.confirmText.emit(this.textModal.value);
  }

}
