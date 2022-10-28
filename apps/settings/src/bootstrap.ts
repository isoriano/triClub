import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './app/containers/profile/profile.component';
import { SETTINGS_ROUTES } from './app/settings.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(ProfileComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(SETTINGS_ROUTES, {
        relativeLinkResolution: 'legacy',
      })
    ),
  ],
}).catch((err) => console.error(err));
