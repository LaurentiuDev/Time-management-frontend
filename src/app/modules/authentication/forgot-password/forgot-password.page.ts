import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { Constants } from 'src/app/shared/utils/data.constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {
  form: FormGroup;
  @ViewChild('loginForm', { static: true }) loginForm: HTMLFormElement;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              Constants.EMAIL_PATTERN
            )
          ]
        ],
      }
    );
  }

  ngOnInit() { }

  onGeneratePasswordResetLink(form: FormGroup) {
    console.log(form);
    // const data: ChangePasswordModel = {
    //   oldPassword: form.value.oldPassword,
    //   newPassword: form.value.newPassword,
    //   confirmPassword: form.value.confirmPassword
    // };
    const email: string = form.value.email;

    this.authenticationService.generatePasswordResetLink(email).subscribe(
      result => {
        console.log(result);
      }
    );
  }
}
