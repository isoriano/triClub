import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { InformationRowComponent } from './information-row.component';

export default {
  title: 'InformationRowComponent',
  component: InformationRowComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<InformationRowComponent>;

const Template: Story<InformationRowComponent> = (args: InformationRowComponent) => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  label: '',
  information: ''
};
