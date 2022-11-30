import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from '@isg/ui';

@Component({
  standalone: true,
  selector: 'tcs-profile-row',
  templateUrl: 'profile-row.component.html',
  styleUrls: ['profile-row.component.scss'],
  imports: [ButtonComponent, CommonModule, MatDividerModule, MatIconModule]
})
export class ProfileRowComponent {
  @Input() label: string;
  @Output() save = new EventEmitter();

  isEditing: boolean;
}
