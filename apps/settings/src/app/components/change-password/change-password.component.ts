import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ChangePassword } from '@tri-club/user';

import { ButtonComponent, FormFieldInputComponent } from '@isg/ui';

@Component({
  selector: 'tcs-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormFieldInputComponent]
})
export class ChangePasswordComponent implements OnInit {
  @Output() update = new EventEmitter<ChangePassword>();

  passwordForm: FormGroup<{
    newPassword: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: this.confirmedValidator('newPassword', 'confirmPassword')
      }
    );
  }

  onUpdatePassword(): void {
    if (this.passwordForm.valid) {
      this.update.emit(this.passwordForm.value as ChangePassword);
    }
  }

  private confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): void => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ custom__confirmedValidator: 'Password does not match' });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
