import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product.component';
import { AuthGuard } from 'src/app/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'products',
        component: ListComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
