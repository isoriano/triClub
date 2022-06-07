import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as userActions from '../../store/actions/user.actions';
import * as userSelectors from '../../store/selectors/user.selectors';
import { IUser } from '../../models/user.interface';

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
const appleLogoUrl = "../../assets/images/buttons/appleLogo.svg";

@Component({
  selector: 'tcs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading$: Observable<boolean>;
  errorMessage$: Subject<string> = new Subject();

  loginForm: UntypedFormGroup;

  private defaultRedirect = 'dashboard';

  constructor(
    private store: Store<IUser>,
    private fb: UntypedFormBuilder,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon("googleLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon("appleLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(appleLogoUrl))
  }

  ngOnInit() {
    this.store.dispatch(new userActions.GetUser());

    this.isLoading$ = this.store.pipe(select(userSelectors.getUserLoading));
    this.store.pipe(select(userSelectors.getUserError)).subscribe(this.errorMessage$);

    this.store.pipe(select(userSelectors.getUid)).subscribe(uid => {
      if (uid) {
        this.router.navigate([this.defaultRedirect]);
      }
    });

    this.initLoginForm();
  }

  signIn() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.store.dispatch(new userActions.LogIn(this.loginForm.value));
    } else {
      this.errorMessage$.next('validator.pleaseEnterCorrectInformation');
    }
  }

  signInGoogle() {
    this.store.dispatch(new userActions.GoogleLogIn());
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.loginForm.get('password')
  }
}
