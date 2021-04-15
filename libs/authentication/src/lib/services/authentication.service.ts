import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthUser } from '../models/auth-user.interface';

export interface SignUpRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoading$ = new BehaviorSubject<boolean>(false);
  authErrorMessage$ = new Subject<string>();
  user$ = new Subject<AuthUser>();

  get authenticated(): boolean {
    return this.authState?.uid !== undefined;
  }

  get currentUser(): Observable<firebase.default.User | null> {
    return this.afAuth.authState;
  }

  private authState: AuthUser | null = null;

  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn().subscribe((user) => {
      this.authState = user;
    });
  }

  signInGoogle() {
    return this.handleResult(() => this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()));
  }

  signIn(request: SignUpRequest) {
    this.isLoading$.next(true);
    return this.handleResult(() => this.afAuth.signInWithEmailAndPassword(request.email, request.password));
  }

  signUp(request: SignUpRequest) {
    this.isLoading$.next(true);
    return this.handleResult(() => this.afAuth.createUserWithEmailAndPassword(request.email, request.password));
  }

  resetPassword(request: { oldPassword: string, newPassword: string }): Promise<boolean> {

    const currentUser = firebase.default.auth().currentUser;
    if (currentUser == null || currentUser.email == null) {
      return new Promise<boolean>(() => false);
    }

    const credential = firebase.default.auth.EmailAuthProvider.credential(
      currentUser.email,
      request.oldPassword
    );

    return currentUser.reauthenticateWithCredential(credential)
      .then(() => {
        return currentUser.updatePassword(request.newPassword).then(() => {
          this.authErrorMessage$.next();
          return true;
        });
      })
      .catch(e => {
        this.authErrorMessage$.next(e.message);
        return false;
      });
  }

  logout() {
    this.user$.next(undefined);
    this.isLoading$.next(false);
    this.afAuth.signOut();
  }

  private handleResult(callback: () => Promise<firebase.default.auth.UserCredential>) {
    return callback()
      .then(userCredentials => this.authenticateUser(userCredentials))
      .catch(e => {
        this.handleError(e);
        return {} as AuthUser;
      });
  }

  private isLoggedIn() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (!user || !user.email) {
          return {} as AuthUser;
        }

        const { email, uid } = user;
        this.user$.next({ email, uid });
        return { email, uid };
      }),
      tap(() => this.isLoading$.next(false))
    );
  }

  private authenticateUser(userCredentials: firebase.default.auth.UserCredential) {

    if (userCredentials.user == null || userCredentials.user.email == null) {
      this.handleError({ code: '', message: 'Issue authenticated the user' });
      return {} as AuthUser;
    }

    const user = {
      email: userCredentials.user.email,
      uid: userCredentials.user.uid
    };

    this.isLoading$.next(false);
    this.user$.next(user);

    return user;
  }

  private handleError(error: { code: string, message: string }) {
    this.isLoading$.next(false);
    this.authErrorMessage$.next(error.message);
  }
}
