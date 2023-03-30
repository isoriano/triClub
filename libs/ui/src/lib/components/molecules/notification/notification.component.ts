import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { pHoritzontal, pVertical, ThemePalette } from '../../../types';
import { ButtonComponent } from '../../atoms';

@Component({
  selector: 'isg-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['./notification.component.scss', './_notification-theme.component.scss'],
  standalone: true,
  imports: [ButtonComponent, MatDividerModule, MatIconModule, NgClass],
})
export class NotificationComponent {
  @Input() color: ThemePalette = 'primary';
  @Input() content: string;
  @Input() pHoritzontal: pHoritzontal;
  @Input() pVertical: pVertical;
  @Input() title: string;

  @Output() clear = new EventEmitter();
}
