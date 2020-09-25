import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@tri-club-suite/authentication';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'tcs-user-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  updatePasswordForm: FormGroup;
  sports = [];
  errorMessage$ = new Subject<string>();
  userUpdating$ = new Subject<boolean>();
  passwordUpdated$ = new Subject<boolean>();
  passwordUpdating$ = new Subject<boolean>();
  authErrorMessage$ = this.authService.authErrorMessage$;
  private user: User;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.initUpdatePasswordForm();
    this.usersService.user.pipe(
      map(user => this.initProfileForm(user))
    ).subscribe();
  }

  sportSelected(changedSport: { name: string, selected: boolean }) {
    const sportFound = this.sports.find(sport => sport.name === changedSport.name);

    sportFound.selected = !sportFound.selected;
  }

  dateChange(value: any) {
    this.profileForm.get('dateOfBirth').setValue(value.toDate());
  }

  reset() {
    this.initProfileForm(this.user);
  }

  updatePassword() {
    this.updatePasswordForm.markAllAsTouched();
    if (this.updatePasswordForm.valid) {
      this.passwordUpdating$.next(true);
      this.authService.resetPassword(this.updatePasswordForm.value).then(r => {
        this.passwordUpdating$.next(false);
        this.passwordUpdated$.next(r);
      });
    }
  }

  save() {
    this.profileForm.markAllAsTouched();
    this.profileForm.get('sports').setValue(JSON.stringify(this.sports));
    if (this.profileForm.valid) {
      this.userUpdating$.next(true)
      this.usersService.createUser({ uid: this.user.uid, ...this.profileForm.value }).then(() => this.userUpdating$.next(false));
    } else {
      this.errorMessage$.next('validator.pleaseEnterCorrectInformation');
    }
  }

  private initProfileForm(user: User) {
    this.user = user;
    this.sports = JSON.parse(user.sports);
    this.profileForm = this.fb.group({
      fullName: [user.fullName, [Validators.required]],
      dateOfBirth: [new Date(user.dateOfBirth.toDate()), [Validators.required]],
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
