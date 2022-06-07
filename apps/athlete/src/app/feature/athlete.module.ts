import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AuthenticationModule, AuthGuard, userReducers } from '@tri-club/authentication';

import { RegistrationComponent } from './containers/registration/registration.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { PasswordStrengthBarComponent } from './components/password-strength-bar/password-strength-bar.component';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    RegistrationComponent,
    ProfileComponent,
    PasswordStrengthBarComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    MatIconRegistry
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    AuthenticationModule,
    StoreModule.forFeature(userReducers.FEATURE_NAME, userReducers.reducers),
  ]
})
export class AthleteModule { }
