import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationComponent } from '../../shared/components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(message: any, type: 'error' |  'success'){
    this.snackBar.openFromComponent(NotificationComponent,{
      data: {
        message,
        type,
      },
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type,
    })
  }
}
