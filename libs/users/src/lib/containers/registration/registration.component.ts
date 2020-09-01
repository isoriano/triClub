import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService, User } from '@tri-club-suite/authentication';

@Component({
  selector: 'tcs-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isLoading$ = this.authService.isLoading$;
  errorMessage$ = this.authService.authErrorMessage$;

  registrationForm: FormGroup;

  private defaultRedirect = 'user/profile';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initRegistrationForm();
  }

  register() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.authService.signUp(this.registrationForm.value).then((user: User) => {
        if(!user){
          return;
        } else {
          this.router.navigate([this.defaultRedirect]);
        }
      })
    } else {
      this.errorMessage$.next('Please enter correct information');
    }
  }

  private initRegistrationForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
