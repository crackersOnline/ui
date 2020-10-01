import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrderComponent } from './my-order/my-order.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/myaccount/profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: MyProfileComponent,
  },
  {
    path: 'order',
    component: MyOrderComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountRoutingModule { }
