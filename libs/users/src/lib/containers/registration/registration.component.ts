import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService, AuthUser } from '@tri-club-suite/authentication';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'tcs-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  isLoading$ = this.authService.isLoading$;
  errorMessage$ = this.authService.authErrorMessage$;

  registrationForm: FormGroup;
  selectedAll: boolean;
  sports = [
    { name: 'Running', selected: false },
    { name: 'Swimming', selected: false },
    { name: 'Bike', selected: false }
  ];

  private defaultRedirect = 'user/profile';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.initRegistrationForm();
  }

  register() {
    this.registrationForm.markAllAsTouched();
    this.registrationForm.get('sports').setValue(JSON.stringify(this.sports));
    if (this.registrationForm.valid) {
      this.authService.signUp(this.registrationForm.value).then((user: AuthUser) => {
        if (!user) {
          return;
        } else {
          this.usersService.createUser({ uid: user.uid, ...this.registrationForm.value });
          this.router.navigate([this.defaultRedirect]);
        }
      })
    } else {
      this.errorMessage$.next('Please enter correct information');
    }
  }

  sportSelected(sport: any) {
    sport.selected = !sport.selected;
  }

  private initRegistrationForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      sports: ['']
    });
  }
}
