import { all } from 'redux-saga/effects';
import userSagas from './sagas/watcher/user.watcher';
import routeSagas from './sagas/watcher/route.watcher';

export default function*() {
  yield all({ userSagas: userSagas(), routeSagas: routeSagas() });
}
