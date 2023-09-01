import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { ButtonComponent } from './button.component';

export default {
  title: 'atoms/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule]
    })
  ],
  argTypes: {
    color: {
      options: ['primary', 'warn', 'accent', 'success', 'info'],
      control: { type: 'radio' }
    },
    variant: {
      options: ['icon', 'raised', 'stroked', 'flat', 'plain', 'menu'],
      control: { type: 'select' }
    }
  }
} as Meta<ButtonComponent>;

export const Primary: Story = (args) => ({
  props: args,
  template: `<isg-button
    [id]="id"
    [type]="type"
    [variant]="variant"
    [color]="color"
    [label]="label"
    [ariaLabel]="ariaLabel"
    [isDisabled]="isDisabled"
    [isLoading]="isLoading"
  >
    <mat-icon slot="plain-button-icon">format_color_fill</mat-icon>
    <mat-icon slot="raised-button-icon">format_color_fill</mat-icon>
    <mat-icon slot="stroked-button-icon">format_color_fill</mat-icon>
    <mat-icon slot="flat-button-icon">format_color_fill</mat-icon>
    <mat-icon slot="button-icon">format_color_fill</mat-icon>
    <img slot="menu-img"  [src]="'https://i.pravatar.cc/300'" [alt]="'Mocked Avatar'" />
    <mat-icon slot="menu-icon"> keyboard_arrow_down </mat-icon>
  </isg-button>`
});

Primary.args = {
  id: '',
  label: 'Sample',
  color: 'primary',
  type: 'button',
  variant: 'stroked',
  ariaLabel: '',
  isDisabled: false,
  isLoading: false
};
