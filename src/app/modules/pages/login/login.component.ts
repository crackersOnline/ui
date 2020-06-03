import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public status: boolean;
  public userEmail: string;
  public password: string;
  public error: string;
  @Input() clear: any;

  constructor(private auth: AuthService, private router: Router, private ref: ChangeDetectorRef) { }
  userLoginForm = new FormGroup({
    loginUsername : new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    loginPassword : new FormControl('', [
      Validators.required
    ])
  });
  ngOnInit() {}

  public loginSubmit() {
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

/*   clear() {
    console.log('test');
    this.userLoginForm.reset();
  }
 */
}
