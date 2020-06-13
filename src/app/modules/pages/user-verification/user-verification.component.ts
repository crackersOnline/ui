import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/fragments/core/notification/notification.component';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  public registerEmail :string;
  public error: string;
  constructor(private pages:PagesService, private router: Router, private commonService: CommonService, private _snackBar:MatSnackBar) {
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
    this.commonService.sendSpinnerStatus(true);
    this.pages.verifyOTP(accVerificationForm.value).subscribe(
      (res :any) => {
        this.commonService.sendSpinnerStatus(false);
        this._snackBar.openFromComponent(NotificationComponent, {
          duration:5000,
          data: "Account activated sucessfully. Login & Place your orders",
          panelClass:"sucesss",
          verticalPosition:"top"
        })
        this.router.navigate(['login']);
      },
      err => {
        this.commonService.sendSpinnerStatus(false);
        this._snackBar.openFromComponent(NotificationComponent, {
          duration:5000,
          data: err.error.message,
          panelClass:"error",
          verticalPosition:"top"
        })
        //this.error = err.error.message;
      }
    );
  }
  ngOnInit() {
  }

}
