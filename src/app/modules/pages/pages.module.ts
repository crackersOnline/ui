import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';



@NgModule({
  declarations: [PagesComponent, LoginComponent, RegistrationComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
