import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PagesService } from '../pages.service';
import { Router } from '@angular/router';
import {ConfirmEqualValidatorDirective} from '../../../common/directives/confirm-equal-validator.directive'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  status = false;
  public username:string;
  public password:string;
  public confirmpassword:string;  

  @Output () enableregister = new EventEmitter();
  @Output () disableregister = new EventEmitter();
  constructor(private pages:PagesService, private router:Router) { }

  ngOnInit() {
  }
  enable_register() {
    this.status = true;
    this.enableregister.emit(this.status);
    console.log('Enable Status', this.status = this.status);
  }
  disable_register() {
    this.status = false;
    this.disableregister.emit(this.status);
    console.log('Disable Status', this.status = this.status);
  }

  /**
   * This function for Registration Form Submit
   */

  public registrationSubmit(registratiomForm:NgForm){
    //console.log(registratiomForm.value);
    this.pages.registration(registratiomForm.value).subscribe(
      data => {
        console.log("Data: ",data);
        console.log("Registration succeess");
      }
    );
    registratiomForm.resetForm();
  }
}
