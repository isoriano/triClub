import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule]
    })
  ],
  argTypes: {
    color: {
      options: ['primary', 'warn', 'accent', 'success'],
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
  [variant]="variant"
  [label]="label"
>
  <mat-icon slot="button-icon">format_color_fill</mat-icon>
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
