import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ConfirmEqualValidatorDirective } from '../common/directives/confirm-equal-validator.directive';
import { CartComponent } from './functional/cart/cart.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, CartComponent],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppMaterialModule,
    CartComponent
  ]
})
export class FragmentsModule { }
