import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './app/container/dashboard.component';
import { DASHBOARD_ROUTES } from './app/dashboard.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(DashboardComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(DASHBOARD_ROUTES, {
        relativeLinkResolution: 'legacy',
      })
    ),
  ],
}).catch((err) => console.error(err));
