import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public status: boolean;
  public username: string;
  public password: string;
  public error: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public submit() {
    console.log('submit', this.username, this.password );
    this.auth.login(this.username, this.password)
      .subscribe(result => {
         this.router.navigate(['admin']);
      },
        err => this.error = 'Could not authenticate' + err.message
      );
  }

}
