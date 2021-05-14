import { ActionReducerMap } from '@ngrx/store';

import * as fromReducers from './user.reducer';

export const FEATURE_NAME = 'AUTH_STATE';

export interface AuthState {
  user: fromReducers.UserState
}

export const reducers: ActionReducerMap<AuthState> = {
  user: fromReducers.userReducer
};

export { UserState } from './user.reducer';
