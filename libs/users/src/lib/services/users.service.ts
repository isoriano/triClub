import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from '@tri-club-suite/authentication';
import { concatMap } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get user() {
    return this.authService.currentUser.pipe(
      concatMap(user => this.usersCollection.doc<User>(user.uid).valueChanges())
    );
  }

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    db: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.usersCollection = db.collection<User>('users');
  }

  createUser({ uid, fullName, dateOfBirth, sports }) {
    const user: User = {
      uid,
      fullName,
      dateOfBirth: dateOfBirth,
      sports,
      isAdministrator: false
    };
    return this.usersCollection.doc<User>(user.uid).set(user).then(e => true);
  }
}
