import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonProjectModule } from './common/common.module';
import { FragmentsModule } from './fragments/fragments.module';
import { PagesModule } from './modules/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { AuthService } from './common/services/auth.service';
import { AdminModule } from './modules/admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AnonymousGuardGuard } from './anonymous-guard.guard';
import { ProductModule } from './modules/product/product.module';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MyAccountModule } from './modules/my-account/my-account.module';



export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FragmentsModule,
    CommonProjectModule,
    PagesModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    // MyAccountModule,
    // ProductModule,
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
    AuthGuard,
    AnonymousGuardGuard,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,  useValue: { duration: 5000, verticalPosition:  'top'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
