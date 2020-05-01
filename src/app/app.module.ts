import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonProjectModule } from './common/common.module';
import { FragmentsModule } from './fragments/fragments.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FragmentsModule,
    CommonProjectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
