import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { FormFieldInputComponent } from './form-field-input.component';

export default {
  title: 'Molecules/Form Field/Input',
  component: FormFieldInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule
      ]
    })
  ]
} as Meta<FormFieldInputComponent>;

const Template: Story<FormFieldInputComponent> = (args: FormFieldInputComponent) => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  formCtrl: '',
  id: '',
  placeholder: '',
  readonly: false,
  required: false,
  type: 'text',
  maxLength: 0,
  appearance: 'outline'
};
