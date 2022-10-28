import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private httpClient: HttpClient) {}

  updateAvatar(avatarId: string): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}user/avatar`, { avatarId });
  }
}
