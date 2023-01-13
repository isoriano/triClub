import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ButtonComponent, FormFieldInputComponent } from '@isg/ui';

import { ChangePassword } from '../../models';

@Component({
  selector: 'tcs-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormFieldInputComponent]
})
export class ChangePasswordComponent implements OnInit {
  @Input() isUpdating: boolean;
  @Output() update = new EventEmitter<ChangePassword>();

  passwordForm: FormGroup<{
    oldPassword: FormControl<string>;
    confirmPassword: FormControl<string>;
    newPassword: FormControl<string>;
  }>;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        newPassword: ['', Validators.required]
      },
      {
        validator: this.confirmedValidator('oldPassword', 'confirmPassword')
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
