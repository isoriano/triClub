import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'isg-information-row',
  templateUrl: 'information-row.component.html',
  standalone: true,
  imports: [CommonModule, MatDividerModule]
})
export class InformationRowComponent {
  @Input() label: string;
  @Input() information: string;
}
