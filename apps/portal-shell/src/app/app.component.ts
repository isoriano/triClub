import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

import { HeaderComponent } from './components';

@Component({
  selector: 'tcs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatSnackBarModule,
    RouterModule
  ]
})
export class AppComponent implements OnInit {
  private theme = 'light';

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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
    const disclaimerBar = this._snackBar.open(
      'This website is not maintained. Used only for study purposes.',
      'Github',
      {
        duration: undefined,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: 'tcs-disclaimer-bar',
      }
    );
    disclaimerBar.onAction().subscribe(() => {
      this.document.location.href = 'https://github.com/isoriano/triClub';
    });
  }
}
