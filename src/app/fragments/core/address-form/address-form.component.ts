import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Input() enableAddressForm;
  @Output() closeCreateAddress = new EventEmitter();
  constructor() { }
  ngOnInit() {
    console.log("Create Address: ",this.enableAddressForm);
  }

  closeAddressForm() {
    this.enableAddressForm = false;
    this.closeCreateAddress.emit(this.enableAddressForm);
  }
  
}
