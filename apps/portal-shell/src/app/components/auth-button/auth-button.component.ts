import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from '@isg/ui';

@Component({
  selector: 'tcs-auth-button',
  templateUrl: './auth-button.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TranslateModule
  ]
})
export class AuthButtonComponent {
  constructor(public auth: AuthService, @Inject(DOCUMENT) public document: Document) {}
}
