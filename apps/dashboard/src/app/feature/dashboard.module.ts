import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';

import { UserModule } from '@tri-club/user';

import { DashboardComponent } from './container/dashboard.component';
import {  HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    UserModule
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent],
  providers: [],
})
export class DashboardModule { }
