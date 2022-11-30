import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AuthModule } from '@auth0/auth0-angular';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Profile, User, UserService } from '@tri-club/user';

import { UploaderComponent } from '@isg/files';
import { ButtonComponent, FormFieldDateComponent, FormFieldInputComponent } from '@isg/ui';

import { environment } from '../../../environments/environment';
import { ProfileRowComponent } from '../../components/profile-row/profile-row.component';
import { SettingsService } from '../../services';

@Component({
  selector: 'tcs-user-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    AuthModule,
    ButtonComponent,
    CommonModule,
    DatePipe,
    FormFieldDateComponent,
    FormFieldInputComponent,
    MatDividerModule,
    ProfileRowComponent,
    UploaderComponent
  ]
})
export class ProfileComponent implements OnInit {
  profile$: Observable<Profile>;

  default_avatar = environment.defaultAvatar;
  profileForm: FormGroup<{
    uid: FormControl<string>;
    name: FormControl<string>;
    email: FormControl<string>;
    dob: FormControl<Date>;
  }>;

  constructor(private fb: FormBuilder, private userService: UserService, private settingsService: SettingsService) {
    this.profile$ = this.userService.profile$.pipe(tap((profile) => this.mapForm(profile.user)));
  }

  private get user(): User {
    return this.profileForm.value as User;
  }

  ngOnInit(): void {}

  updateAvatar(result: any): void {
    this.settingsService.updateAvatar(this.user.uid, result[0].id).subscribe(() => this.userService.refreshProfile());
  }

  onSave(): void {
    this.profileForm.markAllAsTouched();
    if (!this.profileForm.valid) {
      return;
    }

    this.userService.updateUser(this.user).subscribe();
  }

  onDeleteAccount(): void {
    this.userService.deleteUserAccount(this.user.uid).subscribe();
  }

  private mapForm(profileUser: User): void {
    this.profileForm = this.fb.group({
      uid: [profileUser.uid],
      name: [profileUser.name, Validators.required],
      email: [profileUser.email, Validators.required],
      dob: [profileUser.dob, Validators.required]
    });
  }

  // sportSelected(changedSport: { name: string, selected: boolean }) {
  //   // const sportFound = this.sports.find(sport => sport.name === changedSport.name);

  //   // sportFound.selected = !sportFound.selected;
  // }

  // dateChange(value: any) {
  //   this.profileForm.get('dateOfBirth')?.setValue(value.toDate());
  // }

  // reset() {
  //   // this.initProfileForm(this.user);
  // }

  // updatePassword() {
  //   this.updatePasswordForm.markAllAsTouched();
  //   if (this.updatePasswordForm.valid) {
  //     this.passwordUpdating$.next(true);
  //     // this.authService.resetPassword(this.updatePasswordForm.value).then(r => {
  //     //   this.passwordUpdating$.next(false);
  //     //   this.passwordUpdated$.next(r);
  //     // });
  //   }
  // }

  // save() {
  //   // this.profileForm.markAllAsTouched();
  //   // this.profileForm.get('sports')?.setValue(JSON.stringify(this.sports));
  //   // if (this.profileForm.valid) {
  //   //   // this.store.dispatch(new userActions.SetUser({ uid: this.user.uid, ...this.profileForm.value }));
  //   // } else {
  //   //   this.errorMessage$.next('validator.pleaseEnterCorrectInformation');
  //   // }
  // }

  // private initProfileForm(user: User | undefined) {
  //   if (user === undefined) {
  //     return;
  //   }

  //   this.user = user;
  //   this.sports = JSON.parse(user.sports);
  //   this.profileForm = this.fb.group({
  //     displayName: [user.displayName, [Validators.required]],
  //     dateOfBirth: [user.dateOfBirth ? user.dateOfBirth.toDate() : '', [Validators.required]],
  //     sports: ['']
  //   });
  // }

  // private initUpdatePasswordForm() {
  //   this.updatePasswordForm = this.fb.group({
  //     oldPassword: ['', [Validators.required]],
  //     newPassword: ['', [Validators.required]]
  //   })
  // }
}
