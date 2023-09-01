import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { ThreeColumnLayoutComponent } from '@isg/ui';

@Component({
  selector: 'tcs-settings-root',
  templateUrl: './settings.component.html',
  styleUrls: ['../../../styles.scss', './settings.component.scss', './_settings-theme.component.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule, ThreeColumnLayoutComponent],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent {}
