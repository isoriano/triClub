import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { FormFieldSelectComponent } from './form-field-select.component';

export default {
  title: 'FormFieldSelectComponent',
  component: FormFieldSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule]
    })
  ]
} as Meta<FormFieldSelectComponent>;

const Template: Story<FormFieldSelectComponent> = (args: FormFieldSelectComponent) => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  formCtrl: '',
  useIconsInd: false,
  required: false,
  id: '',
  appearance: 'outline',
  options: []
};