import Axios, { AxiosError, AxiosResponse } from 'axios';
import { put, call } from 'redux-saga/effects';
import {
  UserServerError,
  RegisterPayload,
  LoginPayload
} from '../../../types/redux/sagas/user.type';
import {
  ClearUserErrorsAction,
  SetUserErrorsAction,
  SetUserLoadingAction,
  ResetUserAction,
  SetUserAction
} from '../../../types/redux/actions/userActions.type';
import { registerUser, signInUser } from '../../actions/userActions';
import { UserServerResponse } from '../../../types/redux/reducers/userReducer.type';
import { ResetRouteAction } from '../../../types/redux/actions/routeActions.type';

export function* onRegister({
  payload: { name, email, password }
}: ReturnType<typeof registerUser>) {
  try {
    yield put<SetUserLoadingAction>({
      type: 'SET_USER_LOADING',
      payload: true
    });
    const { data }: AxiosResponse<UserServerResponse> = yield call(() =>
      Axios.post<UserServerResponse>('/user/register', <RegisterPayload>{
        name,
        email,
        password
      })
    );
    // console.log(data);
    Axios.defaults.headers.common['Authorization'] = data.accessToken;
    yield put<SetUserAction>({ type: 'SET_USER', payload: data });
    alert('Registration successful');
  } catch (err) {
    const { response } = <AxiosError<UserServerError | string>>err;
    const message = (response?.data as UserServerError).message;
    if (message && Array.isArray(message)) {
      yield put<ClearUserErrorsAction>({ type: 'CLEAR_USER_ERRORS' });
      yield put<SetUserErrorsAction>({
        type: 'SET_USER_ERRORS',
        payload: message
      });
    } else yield alert(message);
  } finally {
    yield put<SetUserLoadingAction>({
      type: 'SET_USER_LOADING',
      payload: false
    });
  }
}

export function* onLogin({
  payload: { email, password }
}: ReturnType<typeof signInUser>) {
  try {
    yield put<SetUserLoadingAction>({
      type: 'SET_USER_LOADING',
      payload: true
    });
    const { data }: AxiosResponse<UserServerResponse> = yield call(() =>
      Axios.post<UserServerResponse>('/user/login', <LoginPayload>{
        email,
        password
      })
    );
    // console.log(data);
    Axios.defaults.headers.common['Authorization'] = data.accessToken;
    yield put<SetUserAction>({ type: 'SET_USER', payload: data });
    alert('Signin successful');
  } catch (err) {
    const { response } = <AxiosError<UserServerError | string>>err;
    const message = (response?.data as UserServerError).message;
    if (message && Array.isArray(message)) {
      yield put<ClearUserErrorsAction>({ type: 'CLEAR_USER_ERRORS' });
      yield put<SetUserErrorsAction>({
        type: 'SET_USER_ERRORS',
        payload: message
      });
    } else yield alert(message);
  } finally {
    yield put<SetUserLoadingAction>({
      type: 'SET_USER_LOADING',
      payload: false
    });
  }
}

export function* onLogout() {
  try {
    yield call(() => Axios.delete<UserServerResponse>('/user/logout'));
    yield put<ResetUserAction>({ type: 'RESET_USER_STATE' });
    yield put<ResetRouteAction>({ type: 'RESET_ROUTE_STATE' });
  } catch (err) {
    const { response } = <AxiosError<UserServerError | string>>err;
    const message = (response?.data as UserServerError).message as string;
    alert(message);
  } finally {
    yield put<SetUserLoadingAction>({
      type: 'SET_USER_LOADING',
      payload: false
    });
  }
}
