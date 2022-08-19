import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthEnvironment } from '@tri-club/environment';

import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  get(uid: string) {
    return this.httpClient.get(`${AuthEnvironment.apiUrl}users/${uid}`);
  }

  createUser(user: User) {
    return this.httpClient.post(`${AuthEnvironment.apiUrl}users`, user);
  }
}
