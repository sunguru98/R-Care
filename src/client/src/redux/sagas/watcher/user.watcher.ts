import { all, takeLatest } from 'redux-saga/effects';
import {
  registerUser,
  logOutUser,
  signInUser
} from '../../actions/userActions';
import { onLogin, onRegister, onLogout } from '../worker/user.worker';

function* handleRegister() {
  yield takeLatest(registerUser, onRegister);
}

function* handleLogin() {
  yield takeLatest(signInUser, onLogin);
}

function* handleLogout() {
  yield takeLatest(logOutUser, onLogout);
}

export default function*() {
  yield all({
    handleLogin,
    handleRegister,
    handleLogout
  });
}
