import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationModule, AuthGuard } from '@tri-club/authentication';

import { DashboardComponent } from './container/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthenticationModule
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
  providers: [],
})
export class DashboardModule { }
