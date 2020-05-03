import { Component } from '@angular/core';

import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';

  constructor(private auth: AuthService, private router: Router) { }
  
  public logout() {
    console.log('logout')
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
