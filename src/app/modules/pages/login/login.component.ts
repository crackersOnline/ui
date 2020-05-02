import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  status: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  enable_register(){    
    this.status = this.status;
    console.log("Status", this.status = !this.status);
  }
  disable_register() {    
    this.status = this.status;
    console.log("Status", this.status = !this.status);
  }

}
