import { Component, OnInit } from '@angular/core';
import { AppSingletonService } from 'src/app/app.singleton.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  createAddressStatus = false;
  addressList = [];
  constructor(private singletonService: AppSingletonService, private commonService: CommonService) { }

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
}
