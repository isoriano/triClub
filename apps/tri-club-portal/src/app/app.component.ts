import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { map, tap } from 'rxjs/operators';

import { AuthenticationService } from '@tri-club-suite/authentication';

@Component({
  selector: 'tcs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isLoggedIn$ = this.authService.currentUser.pipe(map(user => !!user));
  langSelected: FormControl;
  languages = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' }
  ];
  private theme = 'light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.langSelected = new FormControl('en');
  }

  ngOnInit() {
    this.langSelected.valueChanges.pipe(tap((value) => this.translate.use(value))).subscribe();
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

  hasRoute(route: string) {
    return this.router.url.includes(route);
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
