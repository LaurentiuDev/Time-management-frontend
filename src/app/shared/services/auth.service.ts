import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginModel } from 'src/app/models/login.model';
import { RegisterModel } from 'src/app/models/register.model';
import { environment } from 'src/environments/environment';
import { ChangePasswordModel } from 'src/app/models/change-password.model';
import { AuthResponse } from 'src/app/models/auth-response.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authenticated = false;

  constructor(private http: HttpClient) { }

  public login(data: LoginModel): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${environment.url}api/auth/login`,
      data,
      { observe: 'response' },
    ).pipe(
      map(response => {
        const token = response.body.token;

        this.authenticate(true);
        localStorage.setItem('token', JSON.stringify(token));
        return response;
      }));
  }

  public register(data: RegisterModel): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${environment.url}api/auth/register`,
      data,
      { observe: 'response' }
    ).pipe(
      map(response => {
        const token = response.body.token;

        this.authenticate(true);
        localStorage.setItem('token', JSON.stringify(token));
        return response;
      }));
  }

  public changePassword(data: ChangePasswordModel): Observable<object> {
    return this.http.post(
      `${environment.url}api/auth/change-password`,
      data,
      { observe: 'response' }
    ).pipe(
      map(response => {
        return response;
      }));
  }

  public generatePasswordResetLink(email: string): Observable<object> {
    return this.http.post(
      `${environment.url}api/auth/forgot-password`,
      { Email: email },
      { observe: 'response' }
    ).pipe(
      map(response => {
        return response;
      }));
  }

  public signInWithGoogle() {
    return this.http.post(
      `${environment.url}signin-google`,
      { observe: 'response' }
    )
  }

  /**
   * return whether the user is authenticated
   */
  public isAuthenticated() {
    return this.authenticated;
  }

  /**
   * check whether the user has privileges to perform an action
   */
  public isAuthorized() {
    return this.authenticated;
  }

  private authenticate(isAuthorized: boolean) {
    localStorage.setItem('isAuthenticated', String(isAuthorized));
    this.authenticated = isAuthorized;
  }

  public logout() {
    this.authenticate(false);
  }
}