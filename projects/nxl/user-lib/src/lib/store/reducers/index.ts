import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromUser from './user.reducer';

export interface UserState {
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<UserState> = {
  user: fromUser.reducer,
};

export const getUserState = createFeatureSelector<UserState>('user');
