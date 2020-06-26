import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgForm,
  ValidatorFn
} from '@angular/forms';
import { RegisterModel } from '../../../models/register.model';
import { AuthenticationService } from '../../../shared/services/auth.service';
import { maxLengthValidator } from 'src/app/shared/validators/max-length.validator';
import { Constants } from 'src/app/shared/utils/data.constants';
import { Router } from '@angular/router';
import { APPROUTES } from 'src/app/app.routes.strings';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  Constants = Constants;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.pattern(
              Constants.NAME_PATTERN
            ),
            maxLengthValidator(Constants.MAX_LENGTH_30)
          ]
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.pattern(
              Constants.NAME_PATTERN
            ),
            maxLengthValidator(Constants.MAX_LENGTH_30)
          ]
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.pattern(
              Constants.USERNAME_PATTERN
            )
          ]
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              Constants.EMAIL_PATTERN
            )
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              Constants.PASSWORD_PATTERN
            )
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.matchingPasswords('password', 'confirmPassword') }
    );
  }

  ngOnInit() { }

  public onRegister(form: FormGroup) {
    console.log(form);
    const data: RegisterModel = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      userName: form.value.userName,
      email: form.value.email,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword
    };

    this.authenticationService.register(data).subscribe((response) => {
      this.router.navigate([`${APPROUTES.tabs}/${APPROUTES.task}`]);
    });
  }

  private matchingPasswords(
    passwordKey: string,
    confirmPasswordKey: string
  ): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }
}
