import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'tcs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading$ = this.authService.isLoading$;
  errorMessage$ = this.authService.authErrorMessage$;

  loginForm: FormGroup;

  private defaultRedirect = 'analytics/dashboard';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initloginForm();
  }

  register() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).then((user: User) => {
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

  private initloginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}