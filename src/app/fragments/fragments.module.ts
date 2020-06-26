import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ConfirmEqualValidatorDirective } from '../common/directives/confirm-equal-validator.directive';
import { CartComponent } from './functional/cart/cart.component';
import { NotificationComponent } from './core/notification/notification.component';
import { AddressFormComponent } from './core/address-form/address-form.component';
import { AddressBookComponent } from './functional/address-book/address-book.component';
import { PaymentComponent } from './functional/payment/payment.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent, FooterComponent, CartComponent, NotificationComponent, AddressFormComponent,
    AddressBookComponent, PaymentComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppMaterialModule,
    CartComponent,
    AddressFormComponent,
    AddressBookComponent,
    PaymentComponent
  ],
  entryComponents: [
    NotificationComponent
  ]
})
export class FragmentsModule { }
