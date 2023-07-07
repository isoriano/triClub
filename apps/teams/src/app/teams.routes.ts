import { Routes } from '@angular/router';

import { TeamComponent } from './containers';

export const TEAMS_ROUTES: Routes = [
  {
    path: 'create',
    component: TeamComponent
  },
  {
    path: 'profile:id',
    component: TeamComponent
  }
];
