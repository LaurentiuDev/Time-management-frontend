import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginModel } from 'src/app/models/login.model';
import { Constants } from 'src/app/shared/utils/data.constants';
import { ChangePasswordModel } from 'src/app/models/change-password.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  form: FormGroup;
  @ViewChild('loginForm', { static: true }) loginForm: HTMLFormElement;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: [
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
      { validator: this.matchingPasswords('newPassword', 'confirmPassword') }
    );
  }

  ngOnInit() { }

  onChangePassword(form: FormGroup) {
    console.log(form);
    const data: ChangePasswordModel = {
      oldPassword: form.value.oldPassword,
      newPassword: form.value.newPassword,
      confirmPassword: form.value.confirmPassword
    };

    this.authService.changePassword(data).subscribe(
      result => {
        console.log(result);
      }
    );
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
