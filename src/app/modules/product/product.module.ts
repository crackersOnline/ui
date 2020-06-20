import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { FragmentsModule } from 'src/app/fragments/fragments.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product.component';


@NgModule({
  declarations: [ListComponent, CheckoutComponent, ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FragmentsModule
  ]
})
export class ProductModule { }
