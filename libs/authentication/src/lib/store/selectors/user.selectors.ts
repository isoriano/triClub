import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducers from '../reducer';
import * as fromUserReducers from '../reducer/user.reducer';
import { User } from '../../models/user.interface';

export const getAuthState = createFeatureSelector<fromReducers.AuthState>(
  fromReducers.FEATURE_NAME
);

export const getUserState = createSelector(
  getAuthState,
  (state: fromReducers.AuthState) => {
    return state.user
      ? (state.user as fromUserReducers.UserState)
      : fromUserReducers.initialState;
  }
);

export const getUser = createSelector(
  getUserState,
  (userState: fromUserReducers.UserState) => {
    return userState.user;
  }
);

export const getUid = createSelector(getUser, (user: User) => {
  return user.uid;
});

export const getUserLoading = createSelector(
  getUserState,
  (user: fromUserReducers.UserState) => {
    return user.loading;
  }
);

export const getUserSaving = createSelector(
  getUserState,
  (user: fromUserReducers.UserState) => {
    return user.saving;
  }
);

export const getUserError = createSelector(
  getUserState,
  (user: fromUserReducers.UserState) => {
    return user.error;
  }
);
