import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ButtonSize, ButtonType, ButtonVariant, ThemePalette } from '../../../types';

@Component({
  selector: 'isg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss', '_button-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @Output() clicked = new EventEmitter();
}
