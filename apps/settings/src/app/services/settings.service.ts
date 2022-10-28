import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { File } from '@isg/files';

import { environment } from '../../environments/environment';
import { Profile } from '../models';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private httpClient: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${environment.apiUrl}user/profile`);
  }

  getAvatar(imageId: string): Observable<File> {
    return this.httpClient.get<File>(`${environment.apiUrl}file/${imageId}`);
  }

  updateAvatar(avatarId: string): Observable<any> {
    return this.httpClient.put(
      `${environment.apiUrl}user/avatar`,
      { avatarId }
    );
  }
}
