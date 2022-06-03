import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { ThemePalette, Option } from '../../../../types';

@Component({
  selector: 'tcs-form-field-select',
  templateUrl: './form-field-select.component.html',
  styleUrls: ['./form-field-select.component.scss'],
})
export class FormFieldSelectComponent {
  @Input() set formCtrl(ctrl: AbstractControl) {
    this.formControl = ctrl ? (ctrl as UntypedFormControl) : new UntypedFormControl('');
  }
  @Input() options: Option[];
  @Input() required: boolean;
  @Input() id?: string;
  @Input() appearance: 'standard' | 'outline' = 'outline';
  @Input() color: ThemePalette;

  @Output() selectionChange = new EventEmitter();

  formControl: UntypedFormControl;

  onSelectChange(change: MatSelectChange): void {
    this.selectionChange.emit(change);
  }
}
