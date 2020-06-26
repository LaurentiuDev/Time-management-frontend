import { AuthenticationService } from '../services/auth.service';
import { Router, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APPROUTES } from 'src/app/app.routes.strings';

@Injectable({
  providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanLoad {

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated === 'false') {
      this.router.navigate([`${APPROUTES.login}`]);
    }
    return true;
  }
}
