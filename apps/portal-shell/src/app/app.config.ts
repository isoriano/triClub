import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Store } from '@tri-club/user';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http);

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    importProvidersFrom(
      AuthModule.forRoot({
        domain: environment.auth0Settings.domain,
        clientId: environment.auth0Settings.clientId,
        audience: environment.auth0Settings.audience,
        redirectUri: environment.auth0Settings.redirectUri,
        httpInterceptor: {
          allowedList: [`${environment.apiUrl}*`]
        }
      }),
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(routes, {}),
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    provideStore({ userStore: Store.reducer.userReducer }),
    provideEffects(Store.effects.UserEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      // If set to true, will include stack trace for every dispatched action,
      // so you can see it in trace tab jumping directly to that part of code
      trace: false,
      traceLimit: 75 // maximum stack trace frames to be stored (in case trace option was provided as true)
    })
  ]
};
