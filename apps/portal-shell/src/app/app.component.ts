import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { Store } from '@ngrx/store';

import { Store as UserStore } from '@tri-club/user';

import { NotificationContainerComponent } from '@isg/notification';

import { HeaderComponent } from './components';

@Component({
  selector: 'tcs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatSnackBarModule, NotificationContainerComponent, RouterModule]
})
export class AppComponent implements OnInit {
  auth = inject(AuthService);

  private document = inject(DOCUMENT);
  private snackbar = inject(MatSnackBar);
  private renderer = inject(Renderer2);
  private store = inject(Store);
  private theme = 'light';

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((logged) => {
      if (logged) {
        this.store.dispatch(UserStore.actions.initUser());
      }
    });

    this.setTheme();
    this.openDisclaimer();
  }

  switchTheme(): void {
    this.renderer.removeClass(document.body, this.theme);
    this.theme = this.theme === 'dark-theme' ? 'light-theme' : 'dark-theme';
    this.setTheme();
  }

  private setTheme(): void {
    this.renderer.addClass(document.body, this.theme);
  }

  private openDisclaimer(): void {
    const disclaimerBar = this.snackbar.open('This website is not maintained. Used only for study purposes.', 'Github', {
      duration: undefined,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'tcs-disclaimer-bar'
    });
    disclaimerBar.onAction().subscribe(() => {
      this.document.location.href = 'https://github.com/isoriano/triClub';
    });
  }
}
