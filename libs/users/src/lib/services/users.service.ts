import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from '@tri-club-suite/authentication';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // users: Observable<User[]>;

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
    // this.users = this.usersCollection.valueChanges();
  }

  createUser({ uid, fullName, sports }) {
    const user: User = {
      uid,
      fullName,
      sports,
      isAdministrator: false
    };
    this.usersCollection.doc<User>(user.uid).set(user);
  }
}
