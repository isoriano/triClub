import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'tcs-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

  onGoTo(link: string): void {
    this.router.navigate([link]);
  }
}
