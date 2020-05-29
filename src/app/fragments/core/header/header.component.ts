import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { AppSingletonService } from 'src/app/app.singleton.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private username = '';
  private itemCount:[];
  constructor( private authService: AuthService, private router: Router, private singletonService:AppSingletonService) {
    this.username = localStorage.getItem('userName');
   }

  ngOnInit() {
    this.singletonService.metadataChangeObservable.subscribe(
      (received) => {
        if(received) {
          this.itemCount = this.singletonService.getCartItems();
          console.log("Item Count", this.itemCount);
        }
      }
    );    
  }

  public logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
