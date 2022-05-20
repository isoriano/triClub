import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { ThemePalette, Option } from '../../../../types';

@Component({
  selector: 'tcs-form-field-select',
  templateUrl: './form-field-select.component.html',
  styleUrls: ['./form-field-select.component.scss'],
})
export class FormFieldSelectComponent {
  @Input() set formCtrl(ctrl: AbstractControl) {
    this.formControl = ctrl ? (ctrl as FormControl) : new FormControl('');
  }
  @Input() options: Option[];
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
