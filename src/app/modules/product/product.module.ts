import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { FragmentsModule } from 'src/app/fragments/fragments.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product.component';
import { FormsModule } from '@angular/forms';
import { AppChildComponent } from './app-child/app-child.component';


@NgModule({
  declarations: [ListComponent, CheckoutComponent, ProductComponent, AppChildComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FragmentsModule,
    FormsModule
  ]
})
export class ProductModule { }
