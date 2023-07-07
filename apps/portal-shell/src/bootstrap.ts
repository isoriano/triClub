import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

export const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
