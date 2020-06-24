import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Input() enableAddressForm;
  @Output() closeCreateAddress = new EventEmitter();
  submitted = false;
  addressType = '';
  flatNo = '';
  address = '';
  landmark = '';
  city = '';
  state = '';
  pincode = '';
  mobile = '';
  constructor( private commonService: CommonService ) { }
  ngOnInit() {
    console.log('Create Address: ', this.enableAddressForm);
  }

  closeAddressForm() {
    this.enableAddressForm = false;
    this.closeCreateAddress.emit(this.enableAddressForm);
  }

  onSubmit() {
    this.submitted = true;
    const InputData = {
      addressType: this.addressType,
      flatNo: this.flatNo,
      address: this.address,
      landmark: this.landmark,
      city: this.city,
      state: this.state,
      pincode: this.pincode,
      mobile: this.mobile,
      type: 'INSERT'
    };
    this.commonService.saveAddressBookDetail(InputData).subscribe(
      res => {
        console.log('result', res);
      }
    );
  }

}
