import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';

import { FormFieldDateComponent } from './form-field-date.component';

export default {
  title: 'Molecules/Form Field/Date',
  component: FormFieldDateComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule
      ]
    })
  ]
} as Meta<FormFieldDateComponent>;

const Template: StoryFn<FormFieldDateComponent> = (args: FormFieldDateComponent) => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  formCtrl: '',
  id: '',
  placeholder: '',
  readonly: false,
  required: false,
  appearance: 'outline'
};
