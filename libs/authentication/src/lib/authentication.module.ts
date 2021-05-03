import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './containers/login/login.component';
import { LogoutComponent } from './containers/logout/logout.component';
import { IsAuthorizedDirective } from './directives/is-authorized.directive';

import * as fromReducers from './store/reducer';
import { UserEffects } from './store/effects/user.effects';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    IsAuthorizedDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    EffectsModule.forRoot([
      UserEffects
    ]),
    StoreModule.forFeature(fromReducers.FEATURE_NAME, fromReducers.reducers)
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    IsAuthorizedDirective
  ]
})
export class AuthenticationModule { }
