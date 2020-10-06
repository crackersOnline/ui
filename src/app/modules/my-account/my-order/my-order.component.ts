import { Component, OnInit } from '@angular/core';
import { MyAccountService } from '../my-account.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  myOrderList:any;
  constructor(private myaccoutService:MyAccountService) { }

  ngOnInit() {
    this.myaccoutService.getMyOrders().subscribe(data => {
      this.myOrderList = data.data;
      console.log("My Order:", this.myOrderList)
    });
  }

}
