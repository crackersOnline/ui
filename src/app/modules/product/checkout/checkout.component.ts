import { Component, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  OnChanges
 } from '@angular/core';
import { AppSingletonService } from 'src/app/app.singleton.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  createAddressStatus = false;
  addressList = [];
  constructor( private singletonService: AppSingletonService) {
    console.log('Constructor called');
   }
   ngOnInit() {
     this.singletonService.$addressBookObservable.subscribe(
       (received) => {
         if (received) {
          this.addressList = this.singletonService.getAddressBookItems();
          console.log('Checkout page: addressList', this.addressList);
         }
       }
     );

   }
  enableCreateAddress() {
    this.createAddressStatus = true;
  }
}
