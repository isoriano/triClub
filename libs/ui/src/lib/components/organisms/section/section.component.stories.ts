import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SectionComponent } from './section.component';

export default {
  title: 'SectionComponent',
  component: SectionComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<SectionComponent>;

const Template: Story<SectionComponent> = (args: SectionComponent) => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  opacity: 100
};
