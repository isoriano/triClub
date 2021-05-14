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
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import * as fromComponents from './components';

import { AuthenticationModule, LoginComponent } from '@tri-club/authentication';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      loadRemoteModule({
        // remoteEntry: `${environment.url}${environment.sites.dashboard}/remoteEntry.js`,
        remoteName: 'dashboard',
        exposedModule: './Module'
      }).then(m => m.DashboardModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'athlete',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        // remoteEntry: `${environment.url}${environment.sites.athlete}/remoteEntry.js`,
        remoteName: 'athlete',
        exposedModule: './Module'
      }).then(m => m.AthleteModule)
  }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ...fromComponents.components
  ],
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
        deps: [HttpClient]
      }
    }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    StoreModule.forRoot({}),
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
