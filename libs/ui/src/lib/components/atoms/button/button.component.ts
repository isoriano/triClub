import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  ThemePalette,
} from '../../../types';

@Component({
  selector: 'isg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss', '_button-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule],
})
export class ButtonComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() color: ThemePalette = 'primary';
  @Input() type: ButtonType = 'button';
  @Input() variant: ButtonVariant = 'stroked';
  @Input() size: ButtonSize;
  @Input() ariaLabel: string;
  @Input() isDisabled?: boolean;
  @Input() isLoading?: boolean;
  @Input() menuContent: MatMenu;

  @Output() clicked = new EventEmitter();
}
