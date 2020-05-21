import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { FormsModule } from "@angular/forms";
import { LoginRegisterUserComponent } from "./login-register-user/login-register-user.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { PagesComponent } from "./pages.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { FragmentsModule } from "src/app/fragments/fragments.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    LoginRegisterUserComponent,
    ForgotPasswordComponent,
    PagesComponent,
    ResetPasswordComponent
  ],
  imports: [CommonModule, FormsModule, PagesRoutingModule, FragmentsModule],
})
export class PagesModule {}
