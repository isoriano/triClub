import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { environment } from '../environments/environment';
import * as fromContainers from './containers';

export const routes: Routes = [
  {
    path: '',
    component: fromContainers.LandingPageComponent,
    pathMatch: 'full',
  },
  { path: 'auth', component: fromContainers.AuthComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.url}${environment.sites.dashboard}/remoteEntry.js`,
        exposedModule: './routes',
      }).then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'teams',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.url}${environment.sites.teams}/remoteEntry.js`,
        exposedModule: './routes',
      }).then((m) => m.TEAMS_ROUTES),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.url}${environment.sites.settings}/remoteEntry.js`,
        exposedModule: './routes',
      }).then((m) => m.SETTINGS_ROUTES),
  },
  { path: '**', component: fromContainers.FourOFourComponent },
];
