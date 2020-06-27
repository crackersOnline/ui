import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  createAddressStatus = false;
  addressList = [];
  @Output() deliveryAddressEmit = new EventEmitter();
  constructor(private singletonService: AppSingletonService, private authService: AuthService) { }

  ngOnInit() {
    this.singletonService.$addressBookObservable.subscribe(
      (received) => {
        if (received) {
         this.addressList = this.singletonService.getAddressBookItems();
         console.log('Address page: addressList', this.addressList);
        }
      }
    );
  }
  enableCreateAddress() {
    this.createAddressStatus = true;
  }

  triggerFormAddressForm(event) {
    const data = event;
    this.createAddressStatus = data.status;
    if (data.type === 'submit') {
      this.authService.getAddress().subscribe(address => {
        console.log('getAddress', address);
        if (address && (address.recCount > 0)) {
          this.singletonService.setAddressBookItems(address.data);
          this.singletonService.changeAddressBook(true);
        }
      });
    }
  }

  onDeliveryAddress(event) {
    console.log('onDeliveryAddress', event);
    this.deliveryAddressEmit.emit(event);
  }
}
