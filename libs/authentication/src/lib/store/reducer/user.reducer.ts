import * as userActions from '../actions/user.actions';
import { User } from '../../models/user.interface';

export interface UserState {
  user: User;
  loading: boolean;
  saving: boolean;
  error: string;
}

export const initialState: UserState = {
  user: new User(),
  loading: false,
  saving: false,
  error: null
}

export type Action = userActions.All;

export function userReducer(state: UserState = initialState, action: Action) {
  switch (action.type) {
    case userActions.GET_USER:
      return { ...state, loading: true };

    case userActions.SET_USER:
      return { ...state, saving: true };

    case userActions.SET_USER_SUCCESS:
      return { ...state, user: action.payload, loading: true, saving: false };

    case userActions.NO_AUTHENTICATED:
      return { ...state, user: new User(), loading: false };

    case userActions.LOGIN:
      return { ...state, loading: true };

    case userActions.GOOGLE_LOGIN:
      return { ...state, loading: true };

    case userActions.AUTH_ERROR:
      return { ...state, error: action.error, loading: false };
  }
}
