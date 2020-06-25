import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute,
  NavigationEnd, Event } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './common/services/auth.service';
import { AppSingletonService } from './app.singleton.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUrl = '';
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private singletonService: AppSingletonService ) {
                router.events.subscribe((event: Event) => {
                  if (event instanceof NavigationEnd ) {
                    this.currentUrl = event.url;
                  }
                });
              }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // localStorage.removeItem('access_token');


      const userInfo = this.singletonService.getUserInfo();
      if (localStorage.getItem('access_token') && !userInfo) {
        this.authService.verifyToken().subscribe((res) => {
          if (res) {
            this.authService.getAddress().subscribe(address => {
              console.log('getAddress', address);
              if(address && (address.recCount > 0) ) {
                this.singletonService.setAddressBookItems(address.data);
                this.singletonService.changeAddressBook(true);
              }
            });
            return true;
          }
        },
        (error) => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('userName');
          this.router.navigate(['login']);
          return false;
        }
        );
        // this.router.navigate(['/']);
        return true;
      } else if (localStorage.getItem('access_token') && userInfo) {
        this.authService.getAddress().subscribe(address => {
          console.log('getAddress', address);
          if(address && (address.recCount > 0) ) {
            this.singletonService.setAddressBookItems(address.data);
            this.singletonService.changeAddressBook(true);
          }
        });
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }

  }

}
