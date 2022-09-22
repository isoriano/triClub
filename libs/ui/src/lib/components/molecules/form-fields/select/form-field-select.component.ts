import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { ThemePalette, Option } from '../../../../types';

@Component({
  selector: 'isg-form-field-select',
  templateUrl: './form-field-select.component.html',
  styleUrls: ['./form-field-select.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
})
export class FormFieldSelectComponent {
  @Input() set formCtrl(ctrl: AbstractControl) {
    this.formControl = ctrl ? (ctrl as FormControl) : new FormControl('');
  }
  @Input() options: Option[];
  @Input() useIconsInd: boolean;
  @Input() required: boolean;
  @Input() id?: string;
  @Input() appearance: 'standard' | 'outline' = 'outline';
  @Input() color: ThemePalette;

  @Output() selectionChange = new EventEmitter();

  formControl: FormControl;

  onSelectChange(change: MatSelectChange): void {
    this.selectionChange.emit(change);
  }
}
