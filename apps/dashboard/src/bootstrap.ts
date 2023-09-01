import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { environment } from './environments/environment';
import { DashboardComponent } from './app/container/dashboard.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(DashboardComponent, appConfig).catch((err) => console.error(err));
