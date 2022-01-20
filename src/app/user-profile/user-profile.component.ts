import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../theme/partials/layout';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(private subheader: SubheaderService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.subheader.setTitle('Mi Perfil');
      this.subheader.setBreadcrumbs([{
        title: 'Mi Perfil',
        linkText: 'Mi Perfil',
        linkPath: '/usuario/perfil'
      }]);
    }, 1);
  }
}
