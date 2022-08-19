import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';

import { UserService } from '@tri-club/user';

@Component({
  selector: 'tcs-auth',
  template: '',
})
export class AuthComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((auth0User: User) => {
      console.log(auth0User);
      if (!auth0User) {
        console.log('issueLogin');
        return;
      }
      // if (auth0User.isNew) {
        this.userService
          .createUser({
            uid: auth0User.sub,
            name: auth0User.name,
            email: auth0User.email,
          })
          .subscribe((res) => {
            console.log(res);
            this.router.navigate(['/athlete/register']);
          });
      // } else {
      //   this.router.navigate(['/dashboard']);
      // }
    });
  }
}
