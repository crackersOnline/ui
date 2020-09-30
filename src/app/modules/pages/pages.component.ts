import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.loggedIn) {
      this.router.navigate(['products']);
    }
  }

  ngOnInit() {  }
}
