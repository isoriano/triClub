import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { IUser, userSelectors } from '@tri-club/authentication';

@Component({
  selector: 'tcs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn$ = this.store.pipe(select(userSelectors.getUid), map(uid => !!uid));

  private theme = 'light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private store: Store<IUser>,
    private renderer: Renderer2,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {

    this.setTheme();
    this.openDisclaimer();
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
      this.document.location.href = 'https://github.com/isoriano/triClub';
    });
  }
}
