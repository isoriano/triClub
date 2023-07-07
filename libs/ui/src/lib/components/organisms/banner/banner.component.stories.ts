import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { ButtonComponent } from '../../atoms';
import { BannerComponent } from './banner.component';

export default {
  title: 'Organisms/Banner',
  component: BannerComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent]
    })
  ],
  argTypes: {
    color: {
      options: ['primary', 'warn', 'accent', 'success'],
      control: { type: 'radio' }
    },
    isFlashing: {
      options: [true, false],
      control: { type: 'radio' }
    }
  }
} as Meta<BannerComponent>;

export const Primary: Story<BannerComponent> = (args: BannerComponent) => ({
  props: args,
  template: `
  <isg-banner [color]="color" [isFlashing]="isFlashing" [title]="title">
    <div slot="banner-content">
      <p>Storybook Banner Content</p>
    </div>
    <div slot="banner-actions">
      <isg-button [variant]="'raised'" [label]="'Storybook Action'"></isg-button>
    </div>
  </isg-banner>
  `
});

Primary.args = {
  color: 'primary',
  title: 'Storybook Banner',
  isFlashing: true
};
