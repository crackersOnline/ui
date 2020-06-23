import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit {
 
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
