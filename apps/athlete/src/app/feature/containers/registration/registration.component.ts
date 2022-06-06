import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { IUser, userActions, userSelectors } from '@tri-club/authentication';
import { Observable, Subject } from 'rxjs';

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
const appleLogoUrl = "../../assets/images/buttons/appleLogo.svg";

@Component({
  selector: 'tcs-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isLoading$: Observable<boolean>;
  errorMessage$: Subject<string> = new Subject();

  registrationForm: FormGroup;

  private defaultRedirect = 'athlete/profile';

  constructor(
    private store: Store<IUser>,
    private fb: FormBuilder,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon("googleLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon("appleLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(appleLogoUrl))
  }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(userSelectors.getUserLoading));
    this.store.pipe(select(userSelectors.getUserError)).subscribe(this.errorMessage$);

    this.store.pipe(select(userSelectors.getUid)).subscribe(uid => {
      if (uid) {
        // this.usersService.createUser({ uid: uid, ...this.registrationForm.value });
        this.router.navigate([this.defaultRedirect]);
      }
    });

    this.initRegistrationForm();
  }

  register() {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      // this.handleRegister(() => this.authService.signUp(this.registrationForm.value));
    } else {
      // this.errorMessage$.next('validator.pleaseEnterCorrectInformation');
    }
  }

  registerGoogle() {
    this.store.dispatch(new userActions.GoogleLogIn());
  }

  private initRegistrationForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]]
    });
  }

  // private handleRegister(callback: () => Promise<AuthUser>) {
  //   return callback().then((user: AuthUser) => {
  //     if (!user.uid) {
  //       return;
  //     } else {
  //       this.usersService.createUser({ uid: user.uid, ...this.registrationForm.value });
  //       this.router.navigate([this.defaultRedirect]);
  //     }
  //   });
  // }
}
