import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DASHBOARD_ROUTES } from './dashboard.routes';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(RouterModule.forRoot(DASHBOARD_ROUTES, {}))]
};
