import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationModule, AuthGuard } from '@tri-club-suite/authentication';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { ClubDashboardComponent } from './containers/club-dashboard/club-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'club-dashboard',
    component: ClubDashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ClubDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthenticationModule
  ],
})
export class AnalyticsModule { }
