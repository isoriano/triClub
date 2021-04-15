import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { concatMap } from 'rxjs/operators';

import { AuthenticationService } from '@tri-club/authentication';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get user() {
    return this.authService.currentUser.pipe(
      concatMap(user => this.usersCollection.doc<User>(user?.uid).valueChanges())
    );
  }

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    db: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.usersCollection = db.collection<User>('users');
  }

  async createUser(user: User, editing: boolean = false) {
    const defaultSports = [
      { name: 'run', selected: false },
      { name: 'swim', selected: false },
      { name: 'bike', selected: false }
    ];

    const userToCreate: User = {
      uid: user.uid,
      fullName: user.fullName,
      dateOfBirth: editing ? user.dateOfBirth : null,
      sports: editing ? JSON.stringify(user.sports) : JSON.stringify(defaultSports),
      isAdministrator: false
    };
    return this.usersCollection.doc<User>(userToCreate.uid).set(userToCreate as User).then();
  }
}
