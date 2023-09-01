import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ButtonComponent, ErrorComponent } from '../../atoms';

@Component({
  standalone: true,
  selector: 'isg-editable-information-row',
  templateUrl: 'editable-information-row.component.html',
  styleUrls: ['editable-information-row.component.scss'],
  imports: [
    ButtonComponent,
    CommonModule,
    ErrorComponent,
    MatDividerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ]
})
export class EditableInformationRowComponent implements OnInit, ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'date' = 'text';
  @Output() save = new EventEmitter();

  isDisabled: boolean;
  isSaving: boolean;
  value: string = '';

  private currentValue: string;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  onChange: (value: string) => void;
  onTouch: () => void;

  ngOnInit(): void {}

  setValue($event: any): void {
    this.value = $event.target.value;
    this.onChange($event.target.value);
    this.onTouch();
  }

  onEdit(): void {
    this.ngControl.control.enable();
  }

  onSave(): void {
    this.isSaving = true;
    this.save.emit();
  }

  onCancel(): void {
    this.setValue({ target: { value: this.currentValue } });
    this.setDisabledState(true);
  }

  writeValue(newValue: string): void {
    this.currentValue = newValue;
    this.value = newValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.isSaving = false;
    }
  }
}
