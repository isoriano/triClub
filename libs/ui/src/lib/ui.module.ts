import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import * as fromComponents from './components';

@NgModule({
  declarations: [
    ...fromComponents.atoms,
    ...fromComponents.molecules,
    ...fromComponents.organisms,
  ],
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  exports: [
    ...fromComponents.atoms,
    ...fromComponents.molecules,
    ...fromComponents.organisms,
  ],
})
export class UiModule {}
