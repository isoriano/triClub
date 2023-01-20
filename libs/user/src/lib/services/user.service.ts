import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthEnvironment } from '@tri-club/environment';

import { File } from '@isg/files';

import { ChangePassword, Profile, User, UserHttpResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<UserHttpResponse> {
    return this.httpClient.post<UserHttpResponse>(`${AuthEnvironment.apiUrl}users`, user);
  }

  getCurrent(): Observable<UserHttpResponse> {
    return this.httpClient.get<UserHttpResponse>(`${AuthEnvironment.apiUrl}user`);
  }

  updateAvatar(avatarId: string): Observable<File> {
    return this.httpClient.put<File>(`${AuthEnvironment.apiUrl}user/avatar`, { avatarId });
  }

  updateCurrent(change: Partial<User>): Observable<UserHttpResponse> {
    return this.httpClient.put<UserHttpResponse>(`${AuthEnvironment.apiUrl}user`, change);
  }

  requestPasswordChange(): Observable<any> {
    return this.httpClient.get<UserHttpResponse>(`${AuthEnvironment.apiUrl}user/change-password`);
  }

  getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${AuthEnvironment.apiUrl}user/profile`);
  }

  deleteCurrentUserAccount(): Observable<unknown> {
    return this.httpClient.delete(`${AuthEnvironment.auth0Settings.audience}/user`);
  }
}
