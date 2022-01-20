import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, UserModel } from '../../../auth';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  user;
  constructor(public userService: AuthService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
