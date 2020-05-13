import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public status: boolean;
  public userEmail: string;
  public password: string;
  public error: string;

  constructor(private auth: AuthService, private router: Router) { }
  userLoginForm = new FormGroup({
    loginUsername : new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    loginPassword : new FormControl('', [
      Validators.required
    ])
  });
  ngOnInit() {
  }

  public submit() {
      console.log('submit', this.userEmail, this.password );
      this.auth.login(this.userEmail, this.password)
      .subscribe(result => {
         this.router.navigate(['products']);
      },
        err => {
          if (err.status == 401) {
            this.error = 'This mail id not registered.';
          } else {
            this.error = err.error.message;
          }
        }
      );
    }

}
