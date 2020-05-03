import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterUserComponent } from './login-register-user/login-register-user.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', component: LoginRegisterUserComponent},
  {path: 'forgotpwd', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
