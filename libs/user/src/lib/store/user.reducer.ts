import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { User } from '../models';
import * as UserActions from './user.actions';

export const USER_FEATURE_KEY = 'userStore';

export interface UserState extends EntityState<User> {
  loaded: boolean; // has the User been loaded
  isUpdated: boolean;
  isUpdating: boolean;
  error?: string | null; // last known error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user) => user.uid
});

export const initialUserState: UserState = userAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  isUpdated: false,
  isUpdating: false
});

const reducer = createReducer(
  initialUserState,
  on(UserActions.initUser, (state) => ({ ...state, loaded: false, error: null })),
  on(UserActions.loadUserSuccess, (state, { user }) => userAdapter.setOne(user, { ...state, loaded: true })),
  on(UserActions.loadUserFailure, (state, { errorResponse }) => ({ ...state, error: errorResponse.error })),
  on(UserActions.createUser, (state) => ({ ...state, loaded: false, error: null })),
  on(UserActions.createUserSuccess, (state, { user }) => userAdapter.setOne(user, { ...state, loaded: true })),
  on(UserActions.createUserFailure, (state, { errorResponse }) => ({ ...state, error: errorResponse.error })),
  on(UserActions.updateAvatarSuccess, (state, { avatar }) => {
    const [uid] = Object.keys(state.entities);
    const userToUpdate = state.entities[uid];
    if (userToUpdate) {
      return userAdapter.updateOne({ id: userToUpdate.uid, changes: { ...userToUpdate, avatar: avatar } }, state);
    }
    return state;
  }),
  on(UserActions.updateAvatarFailure, (state, { errorResponse }) => ({ ...state, error: errorResponse.error })),
  on(UserActions.updateUser, (state) => ({ ...state, isUpdated: false, isUpdating: true, error: null })),
  on(UserActions.updateUserSuccess, (state, { user }) =>
    userAdapter.updateOne({ id: user.uid, changes: user }, { ...state, isUpdated: true, isUpdating: false })
  ),
  on(UserActions.updateUserFailure, (state, { errorResponse }) => ({ ...state, isUpdating: false, error: errorResponse.error }))
);

export const userReducer = (state: UserState | undefined, action: Action): UserState => reducer(state, action);
