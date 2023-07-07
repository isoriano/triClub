import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { Store as UserStore } from '@tri-club/user';

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
  @Output() createTeam = new EventEmitter();

  user$ = inject(Store).select(UserStore.selectors.selectUser);

  auth = inject(AuthService);
  default_avatar = environment.defaultAvatar;

  private document: Document = inject(DOCUMENT);
  private router = inject(Router);

  onGoTo(link: string): void {
    this.router.navigate([link]);
  }

  onLogout(): void {
    this.auth.logout({ returnTo: this.document.location.origin });
  }

  onSwitchTheme(): void {
    this.switchTheme.emit();
  }

  onCreateTeam(): void {
    this.createTeam.emit();
  }
}
