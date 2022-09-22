import { Routes } from '@angular/router';

import { DashboardComponent } from './container/dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
];
