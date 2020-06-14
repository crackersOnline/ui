import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/fragments/core/notification/notification.component';

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private commonService:CommonService,
    private _snackBar:MatSnackBar
  ) { }
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
      this.commonService.sendSpinnerStatus(true);
      this.auth.login(this.userEmail, this.password)
      .subscribe(result => {
        this.commonService.sendSpinnerStatus(false);
         this.router.navigate(['products']);
      },
        err => {
          this.commonService.sendSpinnerStatus(false);
          if (err.status == 401) {
            this.error = 'This mail id not registered.';
            this._snackBar.openFromComponent(NotificationComponent, {
              duration:5000,
              data:'This mail id not registered.',
              panelClass:"error",
              verticalPosition:"top"
            })
          } else {
            this._snackBar.openFromComponent(NotificationComponent, {
              duration:5000,
              data:err.error.message,
              panelClass:"error",
              verticalPosition:"top"
            })
            //this.error = err.error.message;
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
