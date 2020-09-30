import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterUserComponent } from './login-register-user/login-register-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PagesComponent } from './pages.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { AnonymousGuardGuard } from 'src/app/anonymous-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'login',
        component: LoginRegisterUserComponent,
        canActivate: [AnonymousGuardGuard]
      },
      {
        path: 'forgotpwd',
        component: ForgotPasswordComponent,
      },
      {
        path: 'resetpwd',
        component: ResetPasswordComponent,
      },
      {
        path: 'userverfiy',
        component: UserVerificationComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
