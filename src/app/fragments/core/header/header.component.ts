import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private username = '';
  constructor( private auth: AuthService, private router: Router) {
    this.username = localStorage.getItem('userName');
   }

  ngOnInit() {
  }

  public logout() {
    console.log('logout');
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
