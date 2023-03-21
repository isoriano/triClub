import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { LoaderOverlayComponent } from './loader-overlay.component';

export default {
  title: 'LoaderOverlayComponent',
  component: LoaderOverlayComponent,
  decorators: [
    moduleMetadata({
      imports: [MatProgressSpinnerModule]
    })
  ],
  argTypes: {
    color: {
      options: ['primary', 'warn', 'accent', 'success'],
      control: { type: 'radio' }
    },
    loading: {
      options: [true, false],
      control: { type: 'radio' }
    }
  }
} as Meta<LoaderOverlayComponent>;

export const Primary: Story = (args) => ({
  props: args,
  template: `
    <isg-loader-overlay [loading]="loading" [color]="color">
      <p>Sample Content</p>
    </isg-loader-overlay>
  `
});

Primary.args = {
  color: 'primary',
  loading: false
};
