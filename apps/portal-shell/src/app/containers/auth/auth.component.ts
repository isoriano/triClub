import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthModule, AuthService, User } from '@auth0/auth0-angular';

import { first } from 'rxjs/operators';

import { UserService } from '@tri-club/user';

@Component({
  selector: 'tcs-auth',
  template: '',
  standalone: true,
  imports: [
    AuthModule,
    RouterModule
  ]
})
export class AuthComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.pipe(first()).subscribe((auth0User: User) => {
      if (!auth0User) {
        return;
      }

      if (auth0User.isNew) {
        this.userService
          .createUser({
            uid: auth0User.sub,
            name: auth0User.name,
            email: auth0User.email,
            dob: undefined
          })
          .subscribe(() => {
            this.router.navigate(['/athlete/register']);
          });
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
