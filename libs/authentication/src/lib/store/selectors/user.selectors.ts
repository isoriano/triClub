import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromReducers from '../reducer';
import * as fromUserReducers from '../reducer/user.reducer';
import { User } from '../../models/user.interface';

export const getAuthState: MemoizedSelector<any, any> = createFeatureSelector<fromReducers.AuthState>(fromReducers.FEATURE_NAME);

export const getUserState: MemoizedSelector<fromReducers.AuthState, fromUserReducers.UserState> = createSelector(getAuthState,
  (state: fromReducers.AuthState) => {
    return !!state.user
      ? state.user as fromUserReducers.UserState
      : fromUserReducers.initialState;
  });

export const getUser: MemoizedSelector<any, User> = createSelector(getUserState, (userState: fromUserReducers.UserState) => {
  return userState.user;
});

export const getUid: MemoizedSelector<any, string> = createSelector(getUser, (user: User) => {
  return user.uid;
});

export const getUserLoading: MemoizedSelector<any, boolean> = createSelector(getUserState, (user: fromUserReducers.UserState) => {
  return user.loading;
});

export const getUserSaving: MemoizedSelector<any, boolean> = createSelector(getUserState, (user: fromUserReducers.UserState) => {
  return user.saving;
});

export const getUserError: MemoizedSelector<any, string> = createSelector(getUserState, (user: fromUserReducers.UserState) => {
  return user.error;
});
