import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordPage } from './change-password.page';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangePasswordPage],
  exports: [ChangePasswordPage],
  entryComponents: [ChangePasswordPage]
})
export class ChangePasswordPageModule { }
