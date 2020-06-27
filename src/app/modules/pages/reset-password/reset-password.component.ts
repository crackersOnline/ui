import { Component, OnInit } from '@angular/core';
import {ConfirmEqualValidatorDirective} from '../../../common/directives/confirm-equal-validator.directive';
import { NgForm } from '@angular/forms';
import { PagesService } from '../pages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/fragments/core/notification/notification.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  confirmpwdError = false;
  public registerEmail: string;
  public error: string;
  resetPasswordForm: NgForm;
  constructor(public pagesService: PagesService, public _snackBar: MatSnackBar, public router: Router, public commonService: CommonService) {
    this.pagesService.emailemitter.subscribe(data => {
      this.registerEmail = data;
    });
   }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  ngOnInit() {
  }
  resetPasswordSubmit(resetPasswordForm: NgForm) {
    this.commonService.sendSpinnerStatus(true);
    this.pagesService.updateNewPassword(resetPasswordForm.value).subscribe(
      (res: any) => {
        this.commonService.sendSpinnerStatus(false);
        // console.log('Response', res);
        this._snackBar.openFromComponent(NotificationComponent, {
          data: 'Password Reset sucessfully. Login & Place your orders',
          panelClass: 'sucesss'
        });
        this.router.navigate(['login']);
      },
      err => {
        this.commonService.sendSpinnerStatus(false);
        this.error = (err.error.message) ? err.error.message : err.message;
        // console.log(this.error);
        this._snackBar.openFromComponent(NotificationComponent, {
            data: this.error,
            panelClass:  'error'
          });
      }
    );
  }

}
