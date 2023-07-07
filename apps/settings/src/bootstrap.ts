import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { Store } from '@tri-club/user';

import { ProfileComponent } from './app/containers/profile/profile.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(ProfileComponent, appConfig).catch((err) => console.error(err));
