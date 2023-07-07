import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from '@isg/ui';

@Component({
  selector: 'tcs-auth-button',
  templateUrl: './auth-button.component.html',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslateModule]
})
export class AuthButtonComponent {
  auth = inject(AuthService);
  document: Document = inject(DOCUMENT);
}
