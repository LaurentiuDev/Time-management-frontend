import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../../../models/login.model';
import { AuthenticationService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { APPROUTES } from 'src/app/app.routes.strings';
import { LoginResult } from 'src/app/models/login-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;

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
    }
  }
}
