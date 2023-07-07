import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { BannerComponent, ButtonComponent } from '@isg/ui';

@Component({
  selector: 'tcs-create-team-banner',
  templateUrl: 'create-team-banner.component.html',
  styleUrls: ['./create-team-banner.component.scss'],
  standalone: true,
  imports: [BannerComponent, ButtonComponent, MatIconModule]
})
export class CreateTeamBannerComponent {
  @Output() createTeam = new EventEmitter();

  onCreateTeam(): void {
    this.createTeam.emit();
  }
}
