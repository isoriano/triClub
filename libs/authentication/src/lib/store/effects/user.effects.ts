import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user.interface';
import { ILogIn } from '../../models/log-in.interface';

import * as userActions from '../actions/user.actions';
export type Action = userActions.All;

@Injectable()
export class UserEffects {

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    db: AngularFirestore,
    private actions: Actions, private afAuth: AngularFireAuth
  ) {
    this.usersCollection = db.collection<User>('users');
  }

  getUser$ = createEffect(() => this.actions.pipe(
    ofType(userActions.GET_USER),
    switchMap(() => this.afAuth.authState),
    switchMap(authData => authData
      ? this.usersCollection.doc<User>(authData.uid).get().pipe(map(userSnapshot => userSnapshot.data()))
      : of(null)),
    map((user: User | null) => {
      if (!!user) {
        const storedUser = new User(user.uid, user.displayName, user.email, user.dateOfBirth, user.sports);
        return new userActions.SetUserSuccess(storedUser);
      } else {
        return new userActions.NoAuthenticated();
      }
    })
  ));

  setUser$ = createEffect(() => this.actions.pipe(
    ofType(userActions.SET_USER),
    map((action: userActions.SetUser) => action.payload),
    switchMap((user: User) => from(this.createUser(user)).pipe(
      map(() => new userActions.GetUser()),
      catchError(err => of(new userActions.AuthError(err.message)))
    ))
  ));

  logIn$ = createEffect(() => this.actions.pipe(
    ofType(userActions.LOGIN),
    map((action: userActions.LogIn) => action.payload),
    switchMap((payload: ILogIn) => from(this.afAuth.signInWithEmailAndPassword(payload.email, payload.password)).pipe(
      map((user) => new userActions.GetUser()),
      catchError(err => of(new userActions.AuthError(err.message)))
    ))
  ));

  googleLogIn$ = createEffect(() => this.actions.pipe(
    ofType(userActions.GOOGLE_LOGIN),
    switchMap(() => from(this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()))),
    switchMap(authData => this.usersCollection.doc<User>(authData.user.uid).get().pipe(
      map(userSnapshot => {
        return !!userSnapshot.data()
          ? new userActions.GetUser()
          : new userActions.SetUser(new User(authData.user.uid, authData.user.displayName));
      })
    ))
  ));

  logOut$ = createEffect(() => this.actions.pipe(
    ofType(userActions.LOGOUT),
    switchMap(() => from(this.afAuth.signOut()).pipe(
      map((user) => new userActions.NoAuthenticated()),
      catchError(err => of(new userActions.AuthError(err.message)))
    ))
  ));

  private createUser(user: User) {
    const defaultSports = JSON.stringify([
      { name: 'run', selected: false },
      { name: 'swim', selected: false },
      { name: 'bike', selected: false }
    ]);

    const userToCreate: User = {
      uid: user.uid,
      displayName: user.displayName,
      dateOfBirth: !!user.dateOfBirth ? user.dateOfBirth : null,
      sports: !!user.sports ? user.sports : defaultSports,
      updatedOn: new Date()
    };

    return this.usersCollection.doc<User>(userToCreate.uid).set(userToCreate);
  }
}
