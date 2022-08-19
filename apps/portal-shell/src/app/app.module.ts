import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  AuthGuard,
  AuthModule,
  AuthHttpInterceptor,
} from '@auth0/auth0-angular';

import { UiModule } from '@isg/ui';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { UserModule } from '@tri-club/user';

const routes: Routes = [
  { path: 'auth', component: fromContainers.AuthComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.url}${environment.sites.dashboard}/remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.DashboardModule),
  },
  {
    path: 'athlete',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.url}${environment.sites.athlete}/remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.AthleteModule),
  },
  { path: '**', component: fromContainers.FourOFourComponent },
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ...fromContainers.containers,
    ...fromComponents.components,
  ],
  imports: [
    AuthModule.forRoot({
      domain: environment.auth0Settings.domain,
      clientId: environment.auth0Settings.clientId,
      audience: environment.auth0Settings.audience,
      redirectUri: environment.auth0Settings.redirectUri,
      httpInterceptor: {
        allowedList: [`${environment.apiUrl}*`],
      },
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    UserModule,
    UiModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
