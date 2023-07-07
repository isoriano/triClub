import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ThemePalette } from '../../../types';

@Component({
  selector: 'isg-banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
  imports: [MatIconModule, NgClass]
})
export class BannerComponent {
  @Input() color: ThemePalette = 'primary';
  @Input() isFlashing: boolean;
  @Input() title: string;
}
