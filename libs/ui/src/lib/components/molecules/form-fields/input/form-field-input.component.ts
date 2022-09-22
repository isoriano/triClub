import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ThemePalette } from '../../../../types/theme-palette.type';

@Component({
  selector: 'isg-form-field-input',
  templateUrl: './form-field-input.component.html',
  styleUrls: ['./form-field-input.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class FormFieldInputComponent {
  @Input() set formCtrl(ctrl: AbstractControl) {
    this.formControl = ctrl ? (ctrl as FormControl) : new FormControl('');
  }
  @Input() id: string;
  @Input() placeholder: string;
  @Input() readonly: boolean;
  @Input() required: boolean;
  @Input() type = 'text';
  @Input() maxLength: number;
  @Input() appearance: 'standard' | 'outline' = 'outline';
  @Input() color: ThemePalette;

  formControl: FormControl;
}