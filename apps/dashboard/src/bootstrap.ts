import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { DashboardComponent } from './app/container/dashboard.component';

import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(DashboardComponent, appConfig).catch((err) => console.error(err));
