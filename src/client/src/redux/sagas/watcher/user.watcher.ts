import { all, takeLatest } from 'redux-saga/effects';
import { onLogin, onRegister, onLogout } from '../worker/user.worker';

function* handleRegister() {
  yield takeLatest('USER_REGISTER', onRegister);
}

function* handleLogin() {
  yield takeLatest('USER_LOGIN', onLogin);
}

function* handleLogout() {
  yield takeLatest('USER_LOGOUT', onLogout);
}

export default function*() {
  yield all({
    handleLogin: handleLogin(),
    handleRegister: handleRegister(),
    handleLogout: handleLogout()
  });
}
