import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { AuthUser } from '../../models/auth-user.interface';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
const appleLogoUrl = "../../assets/images/buttons/appleLogo.svg";

@Component({
  selector: 'tcs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading$ = this.authService.isLoading$;
  errorMessage$ = this.authService.authErrorMessage$;

  loginForm: FormGroup;

  private defaultRedirect = 'dashboard';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon("googleLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon("appleLogo",  this.domSanitizer.bypassSecurityTrustResourceUrl(appleLogoUrl))
  }

  ngOnInit() {
    this.initloginForm();
  }

  signIn() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.handleSignIn(() => this.authService.signIn(this.loginForm.value));
    } else {
      this.errorMessage$.next('validator.pleaseEnterCorrectInformation');
    }
  }

  signInGoogle() {
    this.handleSignIn(() => this.authService.signInGoogle());
  }

  private initloginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private handleSignIn(callback: () => Promise<AuthUser>) {
    return callback()
      .then((user: AuthUser) => {
        if (user.uid) {
          this.router.navigate([this.defaultRedirect]);
        }
      });
      // .catch(e => {
      //   this.handleError(e);
      //   return {} as AuthUser;
      // });
  }
}
