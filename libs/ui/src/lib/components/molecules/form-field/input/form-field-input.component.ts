import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { ThemePalette } from '../../../../types/theme-palette.type';

@Component({
  selector: 'tsc-form-field-input',
  templateUrl: './form-field-input.component.html',
  styleUrls: ['./form-field-input.component.scss'],
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
