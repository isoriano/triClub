import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { TEAMS_ROUTES } from './app/teams.routes';
import { ProfileComponent } from './app/containers/profile/profile.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(ProfileComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(TEAMS_ROUTES))],
}).catch((err) => console.error(err));
