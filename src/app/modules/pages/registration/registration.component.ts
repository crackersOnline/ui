import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PagesService } from '../pages.service';
import { Router } from '@angular/router';
import {ConfirmEqualValidatorDirective} from '../../../common/directives/confirm-equal-validator.directive';
import { UserVerificationComponent } from '../user-verification/user-verification.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  status = false;
  public userEmail: string;
  public password: string;
  public confirmpassword: string;
  confirmpwdError = false;
  registratiomForm: NgForm;
  public invalidResult = {
    duplicateEmailID: false
  };

  @Output () enableregister = new EventEmitter();
  @Output () disableregister = new EventEmitter();
  constructor(private pageService: PagesService, private router: Router) { }

  ngOnInit() {
  }
  enable_register() {
    this.status = true;
    this.enableregister.emit(this.status);
    // console.log('Enable Status', this.status = this.status);
  }
  disable_register() {
    this.status = false;
    this.disableregister.emit(this.status);
    // console.log('Disable Status', this.status = this.status);
  }

  /**
   * This function for Registration Form Submit
   */

  public registrationSubmit(registratiomForm: NgForm) {
    this.pageService.registration(registratiomForm.value).subscribe(
      (res: any) => {
        // console.log("Data: ",res);
        // console.log("Data: ",res.data.userName);
        // console.log("Registration succeess");
        // console.log("Reg User Name",registratiomForm.value.username);
        this.router.navigateByUrl('userverfiy', { skipLocationChange: true }).then(() =>
        this.pageService.emailemitter.emit(res.data.userEmail)
        );
      }
    );
    registratiomForm.resetForm();
  }

  onEnter(pwd, confirmpwd) {
 if (pwd !== confirmpwd) {
  console.log('pwd', pwd, confirmpwd);

  this.confirmpwdError = true;
  return false;
 }
}

checkEmailExsit(e) {
  const email = e.target.value;
  if (email) {
    this.pageService.checkEmailExist(email).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.invalidResult.duplicateEmailID = true;
        } else {
          this.invalidResult.duplicateEmailID = false;
        }
      }
    );
  }
}
}
