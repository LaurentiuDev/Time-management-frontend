import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../../../models/login.model';
import { AuthenticationService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { APPROUTES } from 'src/app/app.routes.strings';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { LoginResult } from 'src/app/models/login-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;
  @ViewChild('loginForm', { static: true }) loginForm: HTMLFormElement;

  private returnUrl: string = '';
  
  loginResult: LoginResult = {
    status: true,
    medium: '',
    platform: 'local',
    user: null,
    token: "",
    error: null,
    errorDescription: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  onLogin(form: FormGroup) {
    const data: LoginModel = {
      email: form.value.email,
      password: form.value.password
    };

    this.authService.login(data).subscribe(
      (response) => {
        this.router.navigate([`${APPROUTES.tabs}/${[APPROUTES.task]}`]);
      }
    );
  }

  socialLoginDone(result: LoginResult) {
    if (result.status) {
      const token = result.token;

      this.authService.authenticate(true);
      localStorage.setItem('token', JSON.stringify(token));

      this.router.navigate([`${APPROUTES.tabs}/${[APPROUTES.task]}`]);
      // this.authService.currentUser().then((user) => {
      //   const data: LoginModel = {
      //     email: user.email,
      //     password: user.password
      //   };
        
      //   this.authService.login(data).subscribe(
      //     (response) => {
      //       this.router.navigate([`${APPROUTES.tabs}/${[APPROUTES.task]}`]);
      //     }
      //   );
      // });
    } else {
      this.loginResult = result;
    }
  }

  // signInWithGoogle(): void {
  //   this.authService.signInWithGoogle().pipe(
  //     map(profile => {
  //       return profile;
  //     })
  //   ).subscribe();
  // }

  @Output() loginComplete: EventEmitter<User> = new EventEmitter();
}
