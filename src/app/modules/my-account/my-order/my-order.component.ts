import { Component, OnInit } from '@angular/core';
import { MyAccountService } from '../my-account.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  myOrderList:any;
  myProductList=[];
  panelOpenState = true;
  constructor(private myaccoutService:MyAccountService) { }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }
  ngOnInit() {
    this.myaccoutService.getMyOrders().subscribe(data => {
      this.myOrderList = data.data;
      this.myProductList = data.data.orderProducts;

      console.log("My Order:", this.myOrderList);
      console.log("My ProductList:", this.myProductList)
    });
  }

}
