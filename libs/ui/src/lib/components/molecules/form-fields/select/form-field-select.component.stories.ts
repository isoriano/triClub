import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';

import { FormFieldSelectComponent } from './form-field-select.component';

export default {
  title: 'Molecules/Form Field/Select',
  component: FormFieldSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule]
    })
  ]
} as Meta<FormFieldSelectComponent>;

const Template: StoryFn<FormFieldSelectComponent> = (args: FormFieldSelectComponent) => ({
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
