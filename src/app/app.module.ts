import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonProjectModule } from './common/common.module';
import { FragmentsModule } from './fragments/fragments.module';
import { PagesModule } from './modules/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { AuthService } from './common/services/auth.service';
import { AdminModule } from './modules/admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FragmentsModule,
    CommonProjectModule,
    PagesModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/user/auth']
      }
    }),
    AdminModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
