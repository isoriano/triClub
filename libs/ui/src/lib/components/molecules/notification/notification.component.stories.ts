import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { NotificationComponent } from './notification.component';

export default {
  title: 'Molecules/Notification',
  component: NotificationComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ],
  argTypes: {
    color: {
      options: ['primary', 'warn', 'accent', 'success'],
      control: { type: 'radio' }
    },
    pHoritzontal: {
      options: ['top', 'hCenter', 'bottom'],
      control: { type: 'radio' }
    },
    pVertical: {
      options: ['left', 'vCenter', 'right'],
      control: { type: 'radio' }
    }
  }
} as Meta<NotificationComponent>;

export const Primary: Story<NotificationComponent> = (args: NotificationComponent) => ({
  props: args,
  template: `
    <isg-notification
      [title]="title"
      [content]="content"
      [color]="color"
      [pHoritzontal]="pHoritzontal"
      [pVertical]="pVertical"
      (clear)="onClear()"
    ></isg-notification>
  `
});

Primary.args = {
  color: 'primary',
  content: 'Storybook notification',
  pHoritzontal: 'top',
  pVertical: 'left',
  title: 'Storybook'
};
