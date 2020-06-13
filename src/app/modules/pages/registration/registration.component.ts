import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PagesService } from "../pages.service";
import { Router } from "@angular/router";
import { ConfirmEqualValidatorDirective } from "../../../common/directives/confirm-equal-validator.directive";
import { UserVerificationComponent } from "../user-verification/user-verification.component";
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  status = false;
  public userEmail: string;
  public password: string;
  public confirmpassword: string;
  confirmpwdError = false;
  registratiomForm: NgForm;
  public invalidResult = {
    duplicateEmailID: false,
  };

  @Output() enableregister = new EventEmitter();
  @Output() disableregister = new EventEmitter();
  constructor(private pageService: PagesService, private router: Router, private commonService:CommonService) {}

  ngOnInit() {}
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
    this.commonService.sendSpinnerStatus(true);
    if (!this.invalidResult.duplicateEmailID) {
      this.pageService
        .registration(registratiomForm.value)
        .subscribe((res: any) => {
          this.commonService.sendSpinnerStatus(false);
          this.router
            .navigateByUrl("userverfiy", { skipLocationChange: true })
            .then(() => this.pageService.emailemitter.emit(res.data.userEmail));
          registratiomForm.resetForm();
        });
    }
  }

  onEnter(pwd, confirmpwd) {
    if (pwd !== confirmpwd) {
      console.log("pwd", pwd, confirmpwd);
      this.confirmpwdError = true;
      return false;
    }
  }

  checkEmailExsit(e) {
    const email = e.target.value;
    if (email) {
      this.pageService.checkEmailExist(email).subscribe((res: any) => {
        console.log("res.recCount", res);
        if (res.recCount > 0) {
          this.invalidResult.duplicateEmailID = true;
        } else {
          this.invalidResult.duplicateEmailID = false;
        }
      });
    }
  }
}
