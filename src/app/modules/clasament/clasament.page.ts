import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/components/users/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-clasament',
  templateUrl: './clasament.page.html',
  styleUrls: ['./clasament.page.scss'],
})
export class ClasamentPage implements OnInit {
  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe();
  }

}
