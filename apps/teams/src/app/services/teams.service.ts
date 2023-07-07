import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private httpClient = inject(HttpClient);

  get(uid: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}teams/${uid}`);
  }

  create(name: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}teams`, { name });
  }
}
