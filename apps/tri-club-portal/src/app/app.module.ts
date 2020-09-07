import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { AuthenticationModule, LoginComponent } from '@tri-club-suite/authentication';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    loadChildren: () => import('@tri-club-suite/users').then(m => m.UsersModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('@tri-club-suite/analytics').then(m => m.AnalyticsModule)
  }
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
