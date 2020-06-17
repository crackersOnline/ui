import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/fragments/core/notification/notification.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public error: string;
  public invalidResult = {
    duplicateEmailID: false,
  };
  constructor(public pageService: PagesService, private _snackBar: MatSnackBar, private router: Router, private commonService: CommonService) { }

  ngOnInit() {
  }
  checkEmailExsit(e) {
    const email = e.target.value;
    if (email) {
      this.pageService.checkEmailExist(email).subscribe((res: any) => {
        if (res.recCount > 0) {
          this.invalidResult.duplicateEmailID = false;
        } else {
          this.invalidResult.duplicateEmailID = true;
        }
      });
    }
  }
  submit(forgotPasswordForm: NgForm) {
    if (!this.invalidResult.duplicateEmailID) {
      this.commonService.sendSpinnerStatus(true);
      this.pageService.forgotPassword(forgotPasswordForm.value).subscribe(
        (res: any) => {
          this.commonService.sendSpinnerStatus(false);
        // SnackBar start
          this._snackBar.openFromComponent(NotificationComponent, {
          duration: 5000,
          data: 'Sucess sent verification code to registered mail id',
          panelClass: 'sucesss',
          verticalPosition: 'top'
        });
          this.router
          .navigateByUrl('resetpwd', { skipLocationChange: true })
          .then(() => this.pageService.emailemitter.emit(res.data.user[0].userEmail));
        },
        err => {
          this.commonService.sendSpinnerStatus(false);
          this.error = (err.error.message) ? err.error.message : err.message;
          this._snackBar.openFromComponent(NotificationComponent, {
            duration: 5000,
            data: this.error,
            panelClass: 'error',
            verticalPosition: 'top'
          });
        }
      );
    }
  }
}
