import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'isg-error',
  templateUrl: 'error.component.html',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule]
})
export class ErrorComponent {
  @Input() error: ValidationErrors;
}
