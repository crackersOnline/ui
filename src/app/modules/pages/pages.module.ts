import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { LoginRegisterUserComponent } from './login-register-user/login-register-user.component';

import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [LoginComponent, RegistrationComponent, LoginRegisterUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
