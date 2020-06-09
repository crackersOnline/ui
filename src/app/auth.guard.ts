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
              private auth: AuthService,
              private singletonService: AppSingletonService ) {
                router.events.subscribe((event: Event) => {
                  if (event instanceof NavigationEnd ) {
                    this.currentUrl = event.url;
                    console.log('this.currentUrl', this.currentUrl);
                  }
                });
              }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // localStorage.removeItem('access_token');


      const userInfo = this.singletonService.getUserInfo();
      if (localStorage.getItem('access_token') && !userInfo) {
        console.log('check localstorage', localStorage.getItem('access_token'));
        this.auth.verifyToken().subscribe((res) => {
          if (res) {
            return true;
          }
        },
        (error) => {
          console.log('error', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('userName');
          this.router.navigate(['login']);
          return false;
        }
        );
        // this.router.navigate(['/']);
        return true;
      } else if (localStorage.getItem('access_token') && userInfo) {
         console.log('test 2');
         return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }

  }

}
