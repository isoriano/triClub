import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ThemePalette } from '../../../types';

@Component({
  selector: 'isg-loader-overlay',
  templateUrl: 'loader-overlay.component.html',
  styleUrls: ['loader-overlay.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf]
})
export class LoaderOverlayComponent {
  @Input() color: ThemePalette = 'primary';
  @Input() loading = false;
}
