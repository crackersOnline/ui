import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register-user',
  templateUrl: './login-register-user.component.html',
  styleUrls: ['./login-register-user.component.scss']
})
export class LoginRegisterUserComponent implements OnInit {

  public registerStatus = false;

  constructor() { }

  ngOnInit() {
  }



  enable_register(event) {
    this.registerStatus = event;
  }
}
