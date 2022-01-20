import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  roles;
  constructor() { }

  ngOnInit(): void {
    this.roles = JSON.parse(localStorage.getItem('user')).roles;
    console.log(this.roles, 'roles')
    console.log('rolwdwdwdes')

  }

}
