import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthModule } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';

import { User, Store as UserStore } from '@tri-club/user';

import { UploaderComponent } from '@isg/files';
import { NotificationService, Settings } from '@isg/notification';
import { ButtonComponent, FormFieldDateComponent, FormFieldInputComponent, NotificationComponent } from '@isg/ui';

import { environment } from '../../../environments/environment';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { ProfileRowComponent } from '../../components/profile-row/profile-row.component';
import { ChangePassword } from '../../models';

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
    FormFieldDateComponent,
    FormFieldInputComponent,
    MatDividerModule,
    MatSnackBarModule,
    ProfileRowComponent,
    UploaderComponent
  ]
})
export class ProfileComponent implements OnInit {
  isUpdating$ = this.store.select(UserStore.selectors.isUpdating).pipe(shareReplay(), tap(up => console.warn(up)));
  user$: Observable<User> = this.store.select(UserStore.selectors.selectUser).pipe(
    filter((user) => !!user),
    tap((user) => this.mapForm(user))
  );
  // isUpdatingPassword$ = this.store.select(UserStore.selectors.isUpdatingPassword);

  ctrlOnEdit: string;
  default_avatar = environment.defaultAvatar;
  profileForm: FormGroup<{
    uid: FormControl<string>;
    name: FormControl<string>;
    email: FormControl<string>;
    dob: FormControl<Date>;
  }>;

  private backupUser: User;
  private notification = inject(NotificationService);

  constructor(private fb: FormBuilder, private store: Store) {}

  private get user(): User {
    return this.profileForm.value as User;
  }

  ngOnInit(): void {
    this.store
      .select(UserStore.selectors.isUpdated)
      .pipe(filter((isUpdated) => !!isUpdated))
      .subscribe(() => (this.ctrlOnEdit = undefined));

    this.store
      .select(UserStore.selectors.selectUserError)
      .pipe(filter((error) => !!error))
      .subscribe((error) => this.notification.open(new Settings('Error', error, 'warn')));
  }

  updateAvatar(result: any): void {
    this.store.dispatch(UserStore.actions.updateAvatar({ avatarId: result[0].id }));
  }

  onEditing(ctrl: string): void {
    this.ctrlOnEdit = ctrl;
  }

  onCancel(): void {
    this.ctrlOnEdit = undefined;
    this.profileForm.patchValue(this.backupUser);
  }

  onSave(): void {
    this.profileForm.markAllAsTouched();
    if (!this.profileForm.get(this.ctrlOnEdit).valid) {
      return;
    }

    const changeRequest: Partial<User> = {};
    changeRequest[this.ctrlOnEdit] = this.user[this.ctrlOnEdit];
    this.store.dispatch(UserStore.actions.updateUser({ change: changeRequest }));
  }

  onDeleteAccount(): void {
    // TODO: Call dispatch action
    // this.userService.deleteUserAccount(this.user.uid).subscribe();
  }

  onUpdatePassword(change: ChangePassword): void {}

  private mapForm(profileUser: User): void {
    this.backupUser = profileUser;
    this.profileForm = this.fb.group({
      uid: [profileUser.uid],
      name: [profileUser.name, Validators.required],
      email: [profileUser.email, Validators.required],
      dob: [profileUser.dob, Validators.required]
    });
  }
}
