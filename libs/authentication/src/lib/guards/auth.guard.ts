import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs/operators';

import { IUser } from '../models/user.interface';
import * as userSelectors from '../store/selectors/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<IUser>,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(userSelectors.getUid),
      take(1),
      map(uid => !!uid),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
