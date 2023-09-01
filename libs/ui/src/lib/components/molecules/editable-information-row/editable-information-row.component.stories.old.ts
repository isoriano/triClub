import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, StoryFn, Meta, StoryObj } from '@storybook/angular';

import { EditableInformationRowComponent } from './editable-information-row.component';

export default {
  title: 'Molecules/Editable Information Row',
  component: EditableInformationRowComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, ReactiveFormsModule]
    })
  ],
  argTypes: {
    type: {
      options: ['date', 'email', 'text'],
      control: { type: 'radio' }
    }
  }
} as Meta<EditableInformationRowComponent>;

const Template: StoryFn<EditableInformationRowComponent> = (args: EditableInformationRowComponent) => ({
  props: {
    ...args,
    sampleForm: new FormGroup({
      mock: new FormControl('', Validators.required)
    })
  },
  template: `
    <form [formGroup]="sampleForm">
      <isg-editable-information-row formControlName="mock" [type]="type" (save)="onSave('name')">
        <span slot="label">Mock Label</span>
      </isg-editable-information-row>
    </form>
  `
});

export const Basic = Template.bind({});
Basic.args = {
  type: 'text'
};

const TemplateAdvanced: StoryFn<EditableInformationRowComponent> = (args: EditableInformationRowComponent) => ({
  props: args,
  template: `
    <form [formGroup]="sampleForm">
      <isg-editable-information-row formControlName="mock" [type]="type" (save)="onSave('name')">
        <span slot="label">Mock Label</span>
        <span slot="hint-start">Hint Start</span>
        <span slot="hint-end">Hint End</span>
      </isg-editable-information-row>
    </form>
  `
});
export const Advanced = TemplateAdvanced.bind({});
Advanced.args = {
  type: 'text',
  sampleForm: new FormGroup({
    mock: new FormControl('', Validators.required)
  })
};
