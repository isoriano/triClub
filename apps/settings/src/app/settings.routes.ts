import { Routes } from '@angular/router';

import { AccountComponent, ProfileComponent, SettingsComponent } from './containers';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];
