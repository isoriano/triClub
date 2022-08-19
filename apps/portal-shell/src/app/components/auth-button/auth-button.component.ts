import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'tcs-auth-button',
  template: `<isg-button
      *ngIf="auth.isAuthenticated$ | async; else loggedOut"
      [label]="'header.signOut' | translate"
      [variant]="'stroked'"
      (clicked)="auth.logout({ returnTo: document.location.origin })"
    ></isg-button>
    <ng-template #loggedOut>
      <isg-button
        [label]="'header.signIn' | translate"
        [variant]="'raised'"
        (clicked)="auth.loginWithRedirect()"
      ></isg-button>
    </ng-template>`,
})
export class AuthButtonComponent {
  constructor(public auth: AuthService, @Inject(DOCUMENT) public document: Document) {}
}
