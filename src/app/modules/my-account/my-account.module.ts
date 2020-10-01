import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyAccountComponent } from './my-account.component';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';



@NgModule({
  declarations: [MyProfileComponent, MyOrderComponent, MyAccountComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    AppMaterialModule
  ],
  exports:[
    AppMaterialModule
  ]
})
export class MyAccountModule { 
  
}
