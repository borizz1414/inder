import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPagination } from '../theme/shared/crud-table/components/paginator/ng-pagination/ng-pagination.component';

import { GeneralTableComponent } from './components/general-table/general-table.component';
import { CRUDTableModule } from '../theme/shared/crud-table/crud-table.module';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CumulativeFormComponent } from './components/cumulative-form/cumulative-form.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ProgressComponent } from './components/progress/progress.component';
import { ObjToArrayPipe } from './components/notification/objToArray.pipe';
import { TextModalComponent } from './components/text-modal/text-modal.component';




@NgModule({
  declarations: [GeneralTableComponent, DeleteModalComponent, NotificationComponent, FileUploadComponent, ProgressComponent,CumulativeFormComponent,ObjToArrayPipe, TextModalComponent],
  imports: [
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    NgbModalModule,
    NgbPaginationModule
  ],
  exports:[GeneralTableComponent,CumulativeFormComponent,FileUploadComponent,ObjToArrayPipe]
})
export class SharedModule { }
