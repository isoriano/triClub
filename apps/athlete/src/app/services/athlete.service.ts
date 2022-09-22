import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AthleteService {
  constructor(private httpClient: HttpClient) {}

  get(uid: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}athlete/${uid}`);
  }
}
