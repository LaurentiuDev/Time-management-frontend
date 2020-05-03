import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/guards/auth.guard';
import { APPROUTES } from './app.routes.strings';
import { SecureInnerPagesGuard } from './shared/guards/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: APPROUTES.login,
    loadChildren: () => import('./modules/authentication/login/login.module').then(m => m.LoginPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: APPROUTES.register,
    loadChildren: () => import('./modules/authentication/register/register.module').then(m => m.RegisterPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: APPROUTES.forgot_password,
    loadChildren: () => import('./modules/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canLoad: [AuthGuardService]
  },
  {
    path: APPROUTES.change_password,
    loadChildren: () => import('./modules/authentication/change-password/change-password.module').then(m => m.ChangePasswordPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: '',
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [SecureInnerPagesGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
