import { Component, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  OnChanges
 } from '@angular/core';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private productService: ProductService ) {}
   ngOnInit() {
   }

   oderSave() {
    console.log('test');
    const inputData = {
      orderProducts: '',
      orderStatus: '',
      paymentMethod: '',
      paymentStatus: '',
      deliveryAddress: '',
      userID: '',
      cartAmount: '',
      couponApplied: '',
      orderDiscount: '',
      orderAmount: 0
    };
    this.productService.saveOrder(inputData).subscribe(
      res => { console.log('res', res);
    });
   }
}
