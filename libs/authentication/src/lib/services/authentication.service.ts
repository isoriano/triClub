import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthUser } from '../models/auth-user.interface';

export class SignUpRequest {
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
    return this.authState !== null;
  }

  get currentUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  private authState = null;

  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn().subscribe(user => {
      this.authState = user;
    });
  }

  signIn(request: SignUpRequest) {
    this.isLoading$.next(true);
    return this.handleResult(() => this.afAuth.signInWithEmailAndPassword(request.email, request.password));
  }

  signUp(request: SignUpRequest) {
    this.isLoading$.next(true);
    return this.handleResult(() => this.afAuth.createUserWithEmailAndPassword(request.email, request.password));
  }

  logout() {
    this.user$.next(null);
    this.isLoading$.next(false);
    this.afAuth.signOut();
  }

  private handleResult(callback: () => Promise<firebase.auth.UserCredential>) {
    return callback()
      .then(userCredentials => this.authenticateUser(userCredentials))
      .catch(e => this.handleError(e));
  }

  private isLoggedIn() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (!user) {
          return null;
        }

        const { email, uid } = user;
        this.user$.next({ email, uid });
        return { email, uid };
      }),
      tap(() => this.isLoading$.next(false))
    );
  }

  private authenticateUser(userCredentials: firebase.auth.UserCredential) {
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
