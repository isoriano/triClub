import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { InformationRowComponent } from './information-row.component';

export default {
  title: 'Molecules/Information Row',
  component: InformationRowComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ],
  argTypes: {
    color: {
      options: ['none', 'primary', 'warn', 'accent', 'success'],
      control: { type: 'radio' }
    },
    hasBorderInd: {
      options: [true, false],
      control: { type: 'radio' }
    }
  }
} as Meta<InformationRowComponent>;

export const Primary: Story<InformationRowComponent> = (args: InformationRowComponent) => ({
  props: args,
  template: `
    <isg-information-row
      [color]="color"
      [hasBorderInd]="hasBorderInd"
      [label]="label"
      [information]="information"
    ></isg-information-row>
  `
});

Primary.args = {
  color: 'none',
  hasBorderInd: true,
  label: 'Storybook',
  information: 'Storybook information'
};
