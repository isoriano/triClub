import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { Store } from '@tri-club/user';

import { ProfileComponent } from './app/containers/profile/profile.component';
import { SETTINGS_ROUTES } from './app/settings.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(ProfileComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(SETTINGS_ROUTES, {})),
    // provideStore(),
    // provideEffects()
  ]
}).catch((err) => console.error(err));
