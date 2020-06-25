import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../../../models/login.model';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { APPROUTES } from 'src/app/app.routes.strings';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;
  @ViewChild('loginForm', { static: true }) loginForm: HTMLFormElement;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
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

  signInWithGoogle(): void {
    this.authService.signInWithGoogle().subscribe();
  }
}
