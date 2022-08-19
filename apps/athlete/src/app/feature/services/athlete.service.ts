import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AthleteService {
  constructor(private httpClient: HttpClient) {}

  get(uid: string) {
    return this.httpClient.get(`${environment.apiUrl}athlete/${uid}`);
  }
}
