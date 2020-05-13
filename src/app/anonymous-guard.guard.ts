import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuardGuard implements CanActivate {

  constructor( private router: Router ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  console.log('AnonymousGuardGuard', localStorage.getItem('access_token'));
  if (!localStorage.getItem('access_token')) {
      return true;
    } else {
      this.router.navigate(['/products']);
      return false;
    }
  }
}
