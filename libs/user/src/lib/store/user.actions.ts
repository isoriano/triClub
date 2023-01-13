import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { File } from '@isg/files';

import { User } from '../models';

export const createUser = createAction('[User] Create User', props<{ user: User }>());
export const createUserSuccess = createAction('[User] Create User Success', props<{ user: User }>());
export const createUserFailure = createAction('[User] Create User Failure', props<{ errorResponse: HttpErrorResponse }>());

export const initUser = createAction('[User] Init');
export const loadUserSuccess = createAction('[User/API] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User/API] Load User Failure', props<{ errorResponse: HttpErrorResponse }>());

export const updateAvatar = createAction('[User] Update Avatar', props<{ avatarId: string }>());
export const updateAvatarSuccess = createAction('[User] Update Avatar Success', props<{ avatar: File }>());
export const updateAvatarFailure = createAction('[User] Update Avatar Failure', props<{ errorResponse: HttpErrorResponse }>());

export const updateUser = createAction('[User] Update User', props<{ change: Partial<User> }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ errorResponse: HttpErrorResponse }>());
