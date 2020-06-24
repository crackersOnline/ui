import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  createAddressStatus = false;  
  constructor() { }

  ngOnInit() {
  }   
  enableCreateAddress() {
    this.createAddressStatus = true;
  }
}
