import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { ProfileComponent } from './app/containers/profile/profile.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(ProfileComponent, appConfig).catch((err) => console.error(err));
