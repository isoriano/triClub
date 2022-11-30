import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { AuthEnvironment } from '@tri-club/environment';

import { Profile, User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private profileEvent$ = new BehaviorSubject(null);

  profile$ = this.profileEvent$.pipe(
    switchMap(() => this.getProfile()),
    shareReplay()
  );

  constructor(private httpClient: HttpClient) {}

  refreshProfile(): void {
    this.profileEvent$.next(null);
  }

  get(uid: string): Observable<User> {
    return this.httpClient.get<User>(`${AuthEnvironment.apiUrl}users/${uid}`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${AuthEnvironment.apiUrl}users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${AuthEnvironment.apiUrl}user/${user.uid}`, user);
  }

  getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${AuthEnvironment.apiUrl}user/profile`);
  }

  deleteUserAccount(uid: string): Observable<unknown> {
    return this.httpClient.delete(`${AuthEnvironment.auth0Settings.audience}/users/${uid}`);
  }
}
