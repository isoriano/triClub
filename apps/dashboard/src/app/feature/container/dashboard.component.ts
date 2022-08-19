import { Component, OnInit } from '@angular/core';
import { AuthService, User as Auth0User } from '@auth0/auth0-angular';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { User, UserService } from '@tri-club/user';

@Component({
  selector: 'tcs-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  user$: Observable<any>

  title = 'dashboard';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.user$ = this.authService.user$.pipe(
      switchMap((auth0User: Auth0User) => this.userService.get(auth0User.sub)),
      tap(user => console.log(user))
    );
  }
}
