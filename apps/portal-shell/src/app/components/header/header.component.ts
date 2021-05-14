import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tcs-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor(
    private router: Router
  ) {}

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
