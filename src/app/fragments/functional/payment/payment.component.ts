import { Component, OnInit } from '@angular/core';
import { AppSingletonService } from 'src/app/app.singleton.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public ifDeliveryAddressSelected = false;
  constructor(private singletonService: AppSingletonService ) { }

  ngOnInit() {
    this.singletonService.deliveryAddStatus.subscribe((status:any)=> {
      this.ifDeliveryAddressSelected = status;
      console.log("Delivery Address Status: ",status);
    });
  }

}
