import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { BackgroundOpacity } from '../../../types';

@Component({
  selector: 'isg-section',
  templateUrl: 'section.component.html',
  styleUrls: ['./section.component.scss', './_section-theme.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SectionComponent {
  @Input() color: ThemePalette;
  @Input() opacity: BackgroundOpacity = 100;
}
