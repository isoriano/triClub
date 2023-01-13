import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'isg-information-row',
  templateUrl: 'information-row.component.html',
  standalone: true,
  imports: [MatDividerModule]
})
export class InformationRowComponent {
  @Input() label: string;
  @Input() information: string;
}
