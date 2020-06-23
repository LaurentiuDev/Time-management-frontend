import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userEmail;
  constructor() { }

  ngOnInit() {
    const token = jwt_decode(localStorage.getItem('token'));
    this.userEmail = jwt_decode(localStorage.getItem('token')).given_name;
  }

}
