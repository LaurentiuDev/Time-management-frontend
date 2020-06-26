import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { CoreModule } from 'src/app/core/core.module';
import { SocialLoginsModule } from '../social-logins/social-logins.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    SocialLoginsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
})
export class LoginPageModule { }
