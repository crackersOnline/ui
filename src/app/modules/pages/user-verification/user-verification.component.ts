import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  public registerEmail :string;
  constructor(private pages:PagesService) {
    this.pages.emailemitter.subscribe(data => {
      this.registerEmail=data;
    })
   }
   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  verificationSubmit(accVerificationForm:NgForm) {
    console.log("Form Data", accVerificationForm.value);
    this.pages.verifyOTP(accVerificationForm.value).subscribe(
      (res :any) => {
        console.log("Response:", res);
      }
    );
  }
  ngOnInit() {
  }

}
