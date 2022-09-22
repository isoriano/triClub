import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';

import { filter } from 'rxjs/operators';

import { ButtonComponent } from '@isg/ui';

@Component({
  selector: 'tcs-landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: [
    './landing-page.component.scss',
    './_landing-page-theme.component.scss',
  ],
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule, TranslateModule],
})
export class LandingPageComponent {
  constructor(
    public auth: AuthService,
    router: Router
  ) {
    this.auth.isAuthenticated$
      .pipe(filter((isAutenticated) => !!isAutenticated))
      .subscribe(() => router.navigate(['dashboard']));
  }
}
