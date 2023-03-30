import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { ThreeColumnLayoutComponent } from './three-column-layout.component';

export default {
  title: 'Layouts/Three Column',
  component: ThreeColumnLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<ThreeColumnLayoutComponent>;

const Template: Story<ThreeColumnLayoutComponent> = (args: ThreeColumnLayoutComponent) => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {};
