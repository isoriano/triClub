import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import * as fromReducers from '../reducer';
import * as fromUserReducers from '../reducer/user.reducer';
import { User } from '../../models/user.interface';

export const getAuthState: MemoizedSelector<unknown, fromReducers.AuthState, DefaultProjectorFn<fromReducers.AuthState>> = createFeatureSelector<fromReducers.AuthState>(fromReducers.FEATURE_NAME);

export const getUserState: MemoizedSelector<fromReducers.AuthState, fromUserReducers.UserState> = createSelector(getAuthState,
  (state: fromReducers.AuthState) => {
    return state.user
      ? state.user as fromUserReducers.UserState
      : fromUserReducers.initialState;
  });

export const getUser: MemoizedSelector<unknown, User> = createSelector(getUserState, (userState: fromUserReducers.UserState) => {
  return userState.user;  
});
           
export const getUid: MemoizedSelector<unknown, string> = createSelector(getUser, (user: User) => {
  return user.uid;
});

export const getUserLoading: MemoizedSelector<unknown, boolean> = createSelector(getUserState, (user: fromUserReducers.UserState) => {
  return user.loading;
});

export const getUserSaving: MemoizedSelector<unknown, boolean> = createSelector(getUserState, (user: fromUserReducers.UserState) => {
  return user.saving;
});

export const getUserError: MemoizedSelector<unknown, string> = createSelector(getUserState, (user: fromUserReducers.UserState) => {
  return user.error;
});
