import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { BackgroundOpacity } from '../../../types';

@Component({
  selector: 'tsc-section',
  templateUrl: 'section.component.html',
  styleUrls: ['./section.component.scss', './_section-theme.component.scss']
})
export class SectionComponent {    
  @Input() color: ThemePalette;
  @Input() opacity: BackgroundOpacity = 100;
}
