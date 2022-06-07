import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { AngularFireModule } from '@angular/fire/compat';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AuthenticationModule, LoginComponent } from '@tri-club/authentication';
import { UiModule } from '@tri-club/ui';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import * as fromComponents from './components';
import * as fromContainers from './containers';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.url}${environment.sites.dashboard}/remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.DashboardModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'athlete',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.url}${environment.sites.athlete}/remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.AthleteModule),
  },
  { path: '**', component: fromContainers.FourOFourComponent }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, ...fromContainers.containers, ...fromComponents.components],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
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
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'TCS NGRX',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AuthenticationModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
