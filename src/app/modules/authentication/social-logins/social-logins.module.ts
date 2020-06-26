import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { TwitterLoginComponent } from './twitter-login/twitter-login.component';
import { MicrosoftLoginComponent } from './microsoft-login/microsoft-login.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [FacebookLoginComponent, GoogleLoginComponent, TwitterLoginComponent, MicrosoftLoginComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [FacebookLoginComponent, GoogleLoginComponent, TwitterLoginComponent, MicrosoftLoginComponent]
})
export class SocialLoginsModule { }
