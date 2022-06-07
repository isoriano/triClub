import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { userActions, userSelectors, userReducers, User, ISport } from '@tri-club/authentication';

@Component({
  selector: 'tcs-user-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  profileForm: UntypedFormGroup;
  updatePasswordForm: UntypedFormGroup;
  sports: ISport[] = [];
  errorMessage$ = new Subject<string>();
  userUpdating$: Observable<boolean>;
  passwordUpdated$ = new Subject<boolean>();
  passwordUpdating$ = new Subject<boolean>();
  
  private user: User;

  constructor(
    private store: Store<userReducers.UserState>,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.userUpdating$ = this.store.pipe(select(userSelectors.getUserSaving));
    this.store.pipe(
      select(userSelectors.getUser),
      filter(user => !!user.uid)
    ).subscribe(user => {
      this.initProfileForm(user)
    });

    this.initUpdatePasswordForm();
  }

  sportSelected(changedSport: { name: string, selected: boolean }) {
    const sportFound = this.sports.find(sport => sport.name === changedSport.name);

    sportFound.selected = !sportFound.selected;
  }

  dateChange(value: any) {
    this.profileForm.get('dateOfBirth')?.setValue(value.toDate());
  }

  reset() {
    this.initProfileForm(this.user);
  }

  updatePassword() {
    this.updatePasswordForm.markAllAsTouched();
    if (this.updatePasswordForm.valid) {
      this.passwordUpdating$.next(true);
      // this.authService.resetPassword(this.updatePasswordForm.value).then(r => {
      //   this.passwordUpdating$.next(false);
      //   this.passwordUpdated$.next(r);
      // });
    }
  }

  async save() {
    this.profileForm.markAllAsTouched();
    this.profileForm.get('sports')?.setValue(JSON.stringify(this.sports));
    if (this.profileForm.valid) {
      this.store.dispatch(new userActions.SetUser({ uid: this.user.uid, ...this.profileForm.value }));
    } else {
      this.errorMessage$.next('validator.pleaseEnterCorrectInformation');
    }
  }

  private initProfileForm(user: User | undefined) {
    if (user === undefined) {
      return;
    }

    this.user = user;
    this.sports = JSON.parse(user.sports);
    this.profileForm = this.fb.group({
      displayName: [user.displayName, [Validators.required]],
      dateOfBirth: [user.dateOfBirth ? user.dateOfBirth.toDate() : '', [Validators.required]],
      sports: ['']
    });
  }

  private initUpdatePasswordForm() {
    this.updatePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]]
    })
  }
}
