import { Action } from '@ngrx/store';
import { ILogIn } from '../../models/log-in.interface';
import { User } from '../../models/user.interface';

export const GET_USER = '[Auth] Get User';
export const SET_USER = '[Auth] Set User';
export const SET_USER_SUCCESS = '[Auth] Set User Success';
export const NO_AUTHENTICATED = '[Auth] No Authenticated';

export const LOGIN = '[Auth] Log In';
export const GOOGLE_LOGIN = '[Auth] Google Log In';
export const LOGOUT = '[Auth] Log Out';

export const AUTH_ERROR = '[Auth] Error';

export class GetUser implements Action {
  readonly type = GET_USER;
}

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: User){}
}

export class SetUserSuccess implements Action {
  readonly type = SET_USER_SUCCESS;
  constructor(public payload: User){}
}

export class NoAuthenticated implements Action {
  readonly type = NO_AUTHENTICATED;
}

export class LogIn implements Action {
  readonly type = LOGIN;
  constructor(public payload: ILogIn) { }
}

export class GoogleLogIn implements Action {
  readonly type = GOOGLE_LOGIN;
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public error: string) { }
}

export type All =
  GetUser |
  SetUser |
  SetUserSuccess |
  NoAuthenticated |
  LogIn |
  GoogleLogIn |
  LogOut |
  AuthError;
