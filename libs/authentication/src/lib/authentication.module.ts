import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoginComponent } from './containers/login/login.component';
import { IsAuthorizedDirective } from './directives/is-authorized.directive';

@NgModule({
  declarations: [
    LoginComponent,
    IsAuthorizedDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  exports: [
    LoginComponent,
    IsAuthorizedDirective
  ]
})
export class AuthenticationModule {}
