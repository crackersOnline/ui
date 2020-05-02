import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PagesComponent, LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PagesModule { }
