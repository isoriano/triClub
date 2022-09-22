import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AuthModule,
  AuthService
} from '@auth0/auth0-angular';

@Component({
  selector: 'tcs-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, AuthModule],
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
