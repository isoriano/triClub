import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';

import { FormFieldInputComponent } from './form-field-input.component';

export default {
  title: 'Molecules/Form Field/Input',
  component: FormFieldInputComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule]
    })
  ]
} as Meta<FormFieldInputComponent>;

const Template: StoryFn<FormFieldInputComponent> = (args: FormFieldInputComponent) => ({
  props: args,
  template: `
    <isg-form-field-input
      [formCtrl]="formCtrl"
      [placeholder]="placeholder"
      [required]="required"
      [type]="type"
    >
      <span slot="label">Date of Birth</span>
      <span slot="hint-start">Hint Start</span>
    </isg-form-field-input>
  `
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
