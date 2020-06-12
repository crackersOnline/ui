import { Component, OnInit } from '@angular/core';
import {ConfirmEqualValidatorDirective} from '../../../common/directives/confirm-equal-validator.directive'
import { NgForm } from '@angular/forms';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  confirmpwdError = false;
  resetPasswordForm:NgForm;
  constructor(public pagesService:PagesService) { }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  ngOnInit() {
  }
  resetPasswordSubmit(resetPasswordForm:NgForm) {
    this.pagesService.updateNewPassword(resetPasswordForm.value).subscribe(
      (res:any) => {
        console.log("Response", res);
      }
    );
  }

}
