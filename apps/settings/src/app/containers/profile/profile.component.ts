import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';

import { Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';

import { UserService } from '@tri-club/user';

import { File, UploaderComponent } from '@isg/files';

import { Profile } from '../../models';
import { SettingsService } from '../../services';

@Component({
  selector: 'tcs-user-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [AuthModule, CommonModule, MatSidenavModule, UploaderComponent],
})
export class ProfileComponent implements OnInit {
  profile$: Observable<Profile>;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.profile$ = this.settingsService.getProfile();
  }

  updateAvatar(result: any): void {
    this.settingsService.updateAvatar(result[0].id).subscribe(() => this.profile$.next());
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
