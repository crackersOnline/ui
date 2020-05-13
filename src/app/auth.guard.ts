import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute,
  NavigationEnd, Event } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUrl = '';
  constructor(private router: Router,
              private route: ActivatedRoute) {
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



      if (localStorage.getItem('access_token')) {
        console.log('check localstorage', localStorage.getItem('access_token'));
        // this.router.navigate(['/']);
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }

  }

}
