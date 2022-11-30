import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';

import { UserService } from '@tri-club/user';

import { ButtonComponent } from '@isg/ui';

import { environment } from '../../../environments/environment';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';

@Component({
  selector: 'tcs-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss', './_header-theme.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatIconModule, MatMenuModule, MatToolbarModule, RouterModule, ThemeSwitchComponent, TranslateModule]
})
export class HeaderComponent {
  @Output() switchTheme = new EventEmitter();

  default_avatar = environment.defaultAvatar;

  constructor(public auth: AuthService, public userService: UserService, @Inject(DOCUMENT) private document: Document, private router: Router) {
    
  }

  onGoTo(link: string): void {
    this.router.navigate([link]);
  }

  onLogout(): void {
    this.auth.logout({ returnTo: this.document.location.origin });
  }

  onSwitchTheme(): void {
    this.switchTheme.emit();
  }
}
