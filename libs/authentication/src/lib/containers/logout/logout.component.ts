import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as userActions from '../../store/actions/user.actions';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'tcs-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {

  constructor(
    private store: Store<IUser>,
    private router: Router
  ) { }

  logout() {
    this.store.dispatch(new userActions.LogOut());
    this.router.navigate(['login']);
  }
}
