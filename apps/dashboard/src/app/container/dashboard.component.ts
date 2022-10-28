import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'tcs-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  constructor(
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.httpClient
      .get(`${environment.apiUrl}files`)
      .subscribe((aux) => console.log(aux));
  }
}
