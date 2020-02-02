import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  SET_USER,
  CLEAR_USER,
  SET_USER_LOADING
} from '../actionTypes/user.types';
import { UserServerResponse } from '../reducers/userReducer.type';

interface UserRegisterAction {
  type: USER_REGISTER;
}

interface UserLoginAction {
  type: USER_LOGIN;
}

interface UserLogoutAction {
  type: USER_LOGOUT;
}

export interface SetUserAction {
  type: SET_USER;
  payload: UserServerResponse;
}

export interface SetUserLoadingAction {
  type: SET_USER_LOADING;
  payload: boolean;
}

interface ClearUserAction {
  type: CLEAR_USER;
}

export type UserActions =
  | UserRegisterAction
  | UserLoginAction
  | UserLogoutAction
  | SetUserAction
  | SetUserLoadingAction
  | ClearUserAction;
