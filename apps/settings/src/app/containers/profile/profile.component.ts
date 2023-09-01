import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';

import { User, Store as UserStore, UserService, ChangePassword } from '@tri-club/user';

import { UploaderComponent } from '@isg/files';
import { NotificationService, Settings } from '@isg/notification';
import { ButtonComponent, EditableInformationRowComponent, FormFieldDateComponent, FormFieldInputComponent, NotificationComponent } from '@isg/ui';

import { environment } from '../../../environments/environment';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { ProfileRowComponent } from '../../components/profile-row/profile-row.component';

@Component({
  selector: 'tcs-user-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    AuthModule,
    ButtonComponent,
    ChangePasswordComponent,
    CommonModule,
    DatePipe,
    EditableInformationRowComponent,
    FormFieldDateComponent,
    FormFieldInputComponent,
    ReactiveFormsModule,
    MatDividerModule,
    MatSnackBarModule,
    ProfileRowComponent,
    UploaderComponent
  ]
})
export class ProfileComponent implements OnInit {
  // isUpdatingPassword$ = this.store.select(UserStore.selectors.isUpdatingPassword);

  ctrlOnEdit: string;
  default_avatar = environment.defaultAvatar;
  profileForm: FormGroup<{
    uid: FormControl<string>;
    name: FormControl<string>;
    email: FormControl<string>;
    dob: FormControl<Date>;
  }> = new FormGroup({
    uid: new FormControl({ value: '', disabled: true }),
    name: new FormControl({ value: '', disabled: true }, Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    dob: new FormControl({ value: null, disabled: true }, Validators.required)
  });

  private backupUser: User;
  private notification = inject(NotificationService);
  private store = inject(Store);
  private router$ = inject(Router);
  private userService$ = inject(UserService);

  isUpdating$ = this.store.select(UserStore.selectors.isUpdating).pipe(
    shareReplay(),
    tap((up) => console.warn(up))
  );

  user$: Observable<User> = this.store.select(UserStore.selectors.selectUser).pipe(
    filter((user) => !!user),
    tap((user) => this.mapForm(user))
  );

  ngOnInit(): void {
    this.store
      .select(UserStore.selectors.isUpdated)
      .pipe(filter((isUpdated) => !!isUpdated))
      .subscribe(() => {
        this.profileForm.get(this.ctrlOnEdit).disable();
        this.ctrlOnEdit = undefined;
      });

    this.store
      .select(UserStore.selectors.selectUserError)
      .pipe(filter((error) => !!error))
      .subscribe((error) => this.notification.open(new Settings('Error', error, 'warn')));
  }

  updateAvatar(result: any): void {
    this.store.dispatch(UserStore.actions.updateAvatar({ avatarId: result[0].id }));
  }

  onSave(ctrlName: string): void {
    this.ctrlOnEdit = ctrlName;
    if (!this.profileForm.get(this.ctrlOnEdit).valid) {
      return;
    }

    const changeRequest: Partial<User> = {};
    changeRequest[this.ctrlOnEdit] = this.profileForm.get(this.ctrlOnEdit).value;
    this.store.dispatch(UserStore.actions.updateUser({ change: changeRequest }));
  }

  onDeleteAccount(): void {
    // TODO: Call dispatch action
    // this.userService.deleteUserAccount(this.user.uid).subscribe();
  }

  onUpdatePassword(): void {
    this.userService$.requestPasswordChange().subscribe((link) => (window.location.href = link.ticket));
  }

  private mapForm(profileUser: User): void {
    this.backupUser = profileUser;
    this.profileForm.patchValue(profileUser);
  }
}
