import {
  LoginPayload,
  RegisterPayload
} from '../../types/redux/sagas/user.type';
import {
  UserLoginAction,
  UserRegisterAction,
  UserLogoutAction
} from '../../types/redux/actions/userActions.type';

export const signInUser = (credentials: LoginPayload): UserLoginAction => ({
  type: 'USER_LOGIN',
  payload: credentials
});

export const registerUser = (user: RegisterPayload): UserRegisterAction => ({
  type: 'USER_REGISTER',
  payload: user
});

export const logOutUser = (): UserLogoutAction => ({
  type: 'USER_LOGOUT'
});
