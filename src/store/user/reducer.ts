import { Reducer } from '@reduxjs/toolkit';
import {
  USER_ACTIONS,
  initialUserState,
  UserState,
  UserActions,
} from './types';

export const userReducer: Reducer<UserState, UserActions> = (
  state: UserState = initialUserState,
  { type, payload }: UserActions
): UserState => {
  switch (type) {
  case USER_ACTIONS.RESET_USER: {
    return { ...initialUserState };
  }
  case USER_ACTIONS.SET_USER: {
    return { ...state, ...payload };
  }
  default: {
    return { ...state };
  }
  }
};
