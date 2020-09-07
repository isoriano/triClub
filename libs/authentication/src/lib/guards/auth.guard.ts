import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authenticationService.authenticated) {
      return true;
    }

    return this.authenticationService.currentUser.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if(!loggedIn) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
