import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthenticationService, AuthUser } from '@tri-club/authentication';
import { UsersService } from '../../services/users.service';

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
const appleLogoUrl = "../../assets/images/buttons/appleLogo.svg";

@Component({
  selector: 'tcs-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isLoading$ = this.authService.isLoading$;
  errorMessage$ = this.authService.authErrorMessage$;

  registrationForm: FormGroup;

  private defaultRedirect = 'athlete/profile';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon("googleLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon("appleLogo", this.domSanitizer.bypassSecurityTrustResourceUrl(appleLogoUrl))
  }

  ngOnInit() {
    this.initRegistrationForm();
  }

  register() {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      this.handleRegister(() => this.authService.signUp(this.registrationForm.value));
    } else {
      this.errorMessage$.next('validator.pleaseEnterCorrectInformation');
    }
  }

  registerGoogle() {
    this.handleRegister(() => this.authService.signInGoogle());
  }

  private initRegistrationForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]]
    });
  }

  private handleRegister(callback: () => Promise<AuthUser>) {
    return callback().then((user: AuthUser) => {
      if (!user.uid) {
        return;
      } else {
        this.usersService.createUser({ uid: user.uid, ...this.registrationForm.value });
        this.router.navigate([this.defaultRedirect]);
      }
    });
  }
}
