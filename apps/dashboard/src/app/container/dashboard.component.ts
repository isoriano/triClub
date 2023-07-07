import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CreateTeamBannerComponent } from '../components/create-team-banner/create-team-banner.component';

@Component({
  selector: 'tcs-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CreateTeamBannerComponent]
})
export class DashboardComponent {
  private router = inject(Router);

  onCreateTeam(): void {
    this.router.navigate(['teams/create']);
  }
}
