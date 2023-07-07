import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthModule, AuthService, User } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';

import { first } from 'rxjs/operators';

import { Store as UserStore } from '@tri-club/user';

@Component({
  selector: 'tcs-auth',
  template: '',
  standalone: true,
  imports: [AuthModule, RouterModule]
})
export class AuthComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  ngOnInit(): void {
    this.auth.user$.pipe(first()).subscribe((auth0User: User) => {
      if (!auth0User) {
        return;
      }

      if (auth0User.isNew) {
        this.store.dispatch(
          UserStore.actions.createUser({
            user: {
              uid: auth0User.sub,
              name: auth0User.name,
              email: auth0User.email,
              dob: undefined
            }
          })
        );
        this.router.navigate(['/settings/profile']);
      } else {
        this.store.dispatch(UserStore.actions.initUser());
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
