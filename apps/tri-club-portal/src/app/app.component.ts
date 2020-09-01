import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '@tri-club-suite/authentication';

@Component({
  selector: 'tcs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  isLoggedIn$ = this.authService.currentUser.pipe(map(user => !!user));

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.componentCssClass = 'dark';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

  switchTheme() {
    this.componentCssClass = this.componentCssClass === 'dark' ? 'light' : 'dark';
  }
}
