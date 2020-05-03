import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordPage } from './forgot-password.page';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPasswordPage],
  exports: [ForgotPasswordPage],
  entryComponents: [ForgotPasswordPage]
})
export class ForgotPasswordModule { }
