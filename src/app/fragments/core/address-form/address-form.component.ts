import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/common/services/common.service';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  @Input() enableAddressForm;
  @Output() closeCreateAddress = new EventEmitter();
  submitted = false;
  // addressType = "";
  // flatNo = "";
  // address = "";
  // landmark = "";
  // city = "";
  // state = "";
  // pincode = "";
  // mobile = "";
  type = 'INSERT';
  public error: string;
  constructor(
    private commonService: CommonService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    console.log('Create Address: ', this.enableAddressForm);
  }

  closeAddressForm(type) {
    this.enableAddressForm = false;
    this.closeCreateAddress.emit({type, status: this.enableAddressForm});
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  getPhoneRegex() {
    return /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  }
  getPincodeRegex() {
    return /^[0-9]{1,6}$/;
  }
  onSubmit(addressForm: NgForm) {
    this.commonService.sendSpinnerStatus(true);
    this.submitted = true;
    console.log('Address Form: ', addressForm.value);
    // const InputData = {
    //   addressType: this.addressType,
    //   flatNo: this.flatNo,
    //   address: this.address,
    //   landmark: this.landmark,
    //   city: this.city,
    //   state: this.state,
    //   pincode: this.pincode,
    //   mobile: this.mobile,
    //   type: "INSERT",
    // };
    this.commonService
      .saveAddressBookDetail(addressForm.value)
      .subscribe((res) => {
        this.commonService.sendSpinnerStatus(false);
        this.snackBar.openFromComponent(NotificationComponent, {
          data: 'New delivery address added sucessfully',
          panelClass: 'sucesss'
        });
        console.log('result', res);
        addressForm.resetForm();
        this.closeAddressForm('submit');
      },
      err => {
        this.commonService.sendSpinnerStatus(false);
        this.error = (err.error.message) ? err.error.message : err.message;
        // console.log(this.error);
        this.snackBar.openFromComponent(NotificationComponent, {
            data: this.error,
            panelClass:  'error'
          });
      }
      );
  }
}
