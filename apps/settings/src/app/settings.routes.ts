import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { Store } from '@tri-club/user';

import { AccountComponent, ProfileComponent, SettingsComponent } from './containers';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    // providers: [provideState(Store.reducer.USER_FEATURE_KEY, Store.reducer.userReducer), provideEffects(Store.effects.UserEffects)],
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
