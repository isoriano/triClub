import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '@tri-club-suite/authentication';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'tcs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn$ = this.authService.currentUser.pipe(map(user => !!user));

  private theme = 'dark';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.setTheme();
    this.openDisclaimer();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  switchTheme() {
    this.renderer.removeClass(document.body, this.theme);
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme();
  }

  private setTheme() {
    this.renderer.addClass(document.body, this.theme);
  }

  private openDisclaimer() {
    const disclaimerBar = this._snackBar.open('This website is not mantained. Used only for study purposes.', 'Github', {
      duration: undefined,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'tcs-disclaimer-bar'
    });
    disclaimerBar.onAction().subscribe(() => {
      this.document.location.href ='https://github.com/isoriano/triClub';
    });
  }
}
