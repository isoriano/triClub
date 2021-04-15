import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@tri-club/authentication';

@Component({
  selector: 'tsc-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
