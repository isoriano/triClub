import { enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
