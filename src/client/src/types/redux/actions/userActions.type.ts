import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  SET_USER,
  CLEAR_USER,
  SET_USER_LOADING,
  CLEAR_USER_ERRORS,
  SET_USER_ERRORS
} from '../actionTypes/user.types';
import {
  UserServerResponse,
  ValidationError
} from '../reducers/userReducer.type';
import { LoginPayload, RegisterPayload } from '../sagas/user.type';

export interface UserRegisterAction {
  type: USER_REGISTER;
  payload: RegisterPayload;
}

export interface UserLoginAction {
  type: USER_LOGIN;
  payload: LoginPayload;
}

export interface UserLogoutAction {
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

export interface SetUserErrorsAction {
  type: SET_USER_ERRORS;
  payload: ValidationError[];
}

export interface ClearUserErrorsAction {
  type: CLEAR_USER_ERRORS;
}

export type UserActions =
  | UserRegisterAction
  | UserLoginAction
  | UserLogoutAction
  | SetUserAction
  | SetUserLoadingAction
  | SetUserErrorsAction
  | ClearUserErrorsAction
  | ClearUserAction;
