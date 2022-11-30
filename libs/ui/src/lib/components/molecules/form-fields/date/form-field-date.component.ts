import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BasicThemePalette } from '../../../../types/theme-palette.type';

@Component({
  selector: 'isg-form-field-date',
  templateUrl: 'form-field-date.component.html',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, ReactiveFormsModule]
})
export class FormFieldDateComponent {
  @Input() set formCtrl(ctrl: AbstractControl) {
    this.formControl = ctrl ? (ctrl as FormControl) : new FormControl('');
  }
  @Input() id: string;
  @Input() placeholder: string;
  @Input() readonly: boolean;
  @Input() required: boolean;
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() color: BasicThemePalette;

  formControl: FormControl;
}

