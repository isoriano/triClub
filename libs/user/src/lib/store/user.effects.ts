import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { File } from '@isg/files';

import { User, UserHttpResponse } from '../models';
import { UserService } from '../services';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService$ = inject(UserService);

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      switchMap((action) => this.userService$.createUser(action.user)),
      map((response: UserHttpResponse) => {
        const userToInit: User = { ...response.user, avatar: response.avatar };
        return UserActions.createUserSuccess({ user: userToInit });
      }),
      /// Instead of returning a new Observable we use the second parameter of catchError
      /// which is a reference to the original Observable. Using startWith we
      /// return our desired error Action and thus “revive” the Effect.
      catchError((errorResponse: HttpErrorResponse, source) => source.pipe(startWith(UserActions.createUserFailure({ errorResponse }))))
    )
  );

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.initUser),
      switchMap(() => this.userService$.getCurrent()),
      map((response: UserHttpResponse) => {
        const userToInit: User = { ...response.user, avatar: response.avatar };
        return UserActions.loadUserSuccess({ user: userToInit });
      }),
      /// Instead of returning a new Observable we use the second parameter of catchError
      /// which is a reference to the original Observable. Using startWith we
      /// return our desired error Action and thus “revive” the Effect.
      catchError((errorResponse: HttpErrorResponse, source) => source.pipe(startWith(UserActions.loadUserFailure({ errorResponse }))))
    )
  );

  updateAvatar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateAvatar),
      switchMap((action) => this.userService$.updateAvatar(action.avatarId)),
      map((avatar: File) => UserActions.updateAvatarSuccess({ avatar })),
      /// Instead of returning a new Observable we use the second parameter of catchError
      /// which is a reference to the original Observable. Using startWith we
      /// return our desired error Action and thus “revive” the Effect.
      catchError((errorResponse: HttpErrorResponse, source) => source.pipe(startWith(UserActions.updateAvatarFailure({ errorResponse }))))
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap((action) => this.userService$.updateCurrent(action.change)),
      map((response: UserHttpResponse) => {
        const userUpdated: User = { ...response.user, avatar: response.avatar };
        return UserActions.updateUserSuccess({ user: userUpdated });
      }),
      /// Instead of returning a new Observable we use the second parameter of catchError
      /// which is a reference to the original Observable. Using startWith we
      /// return our desired error Action and thus “revive” the Effect.
      catchError((errorResponse: HttpErrorResponse, source) => source.pipe(startWith(UserActions.updateUserFailure({ errorResponse }))))
    )
  );
}
