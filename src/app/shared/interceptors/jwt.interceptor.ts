import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('token'));
    if (currentUser) {// && currentUser.Token) {
      request = request.clone({
        setHeaders: { Authorization: `bearer ${currentUser}` }
      });
    }
    return next.handle(request);
  }
}
