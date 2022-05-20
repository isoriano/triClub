import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatMenu } from '@angular/material/menu';

import { ButtonSize, ButtonVariant, ThemePalette } from '../../../types';

@Component({
  selector: 'tcs-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss', '_button-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() id: string;
  @Input() testId: string;
  @Input() label: string;
  @Input() color: ThemePalette = 'primary';
  @Input() isDisabled?: boolean;
  @Input() isLoading?: boolean;
  @Input() type: 'button' | 'menu' | 'reset' | 'submit' = 'button';
  @Input() variant: ButtonVariant = 'stroked';
  @Input() size: ButtonSize;
  @Input() ariaLabel: string;
  @Input() menuContent: MatMenu;

  @Output() clicked = new EventEmitter();

  onClick(): void {
    this.clicked.emit();
  }
}
