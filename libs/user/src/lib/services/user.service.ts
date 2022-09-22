import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { AuthEnvironment } from '@tri-club/environment';

import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  get(uid: string): Observable<User> {
    return this.httpClient.get<User>(`${AuthEnvironment.apiUrl}users/${uid}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${AuthEnvironment.apiUrl}users`, user);
  }
}
