import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http);

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    importProvidersFrom(
      AuthModule.forRoot({
        domain: environment.auth0Settings.domain,
        clientId: environment.auth0Settings.clientId,
        audience: environment.auth0Settings.audience,
        redirectUri: environment.auth0Settings.redirectUri,
        httpInterceptor: {
          allowedList: [`${environment.apiUrl}*`],
        },
      }),
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
}).catch((err) => console.error(err));
