import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { FragmentsModule } from 'src/app/fragments/fragments.module';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FragmentsModule
  ]
})
export class ProductModule { }
