import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APPROUTES } from 'src/app/app.routes.strings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanLoad {
  constructor(public auth: AuthService, public router: Router) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated === 'true') {
      this.router.navigate([`${APPROUTES.tabs}/${APPROUTES.task}`]);
    }
    return true;
  }
}
