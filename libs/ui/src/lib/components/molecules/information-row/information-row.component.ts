import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { OptionalThemePalette } from '../../../types';

@Component({
  selector: 'isg-information-row',
  templateUrl: 'information-row.component.html',
  styleUrls: ['./information-row.component.scss'],
  standalone: true,
  imports: [MatIconModule, NgClass]
})
export class InformationRowComponent {
  @Input() color: OptionalThemePalette;
  @Input() hasBorderInd = true;
  @Input() information: string;
  @Input() label: string;
}
