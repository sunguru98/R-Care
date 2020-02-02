import { all, takeLatest } from 'redux-saga/effects';
import {
  createRoute,
  createMultipleRoutes,
  fetchRoutes,
  updateRoute,
  deleteRoute,
  getSingleRoute
} from '../../actions/routeActions';
import {
  onCreateRoute,
  onCreateRoutes,
  onUpdateRoute,
  onFetchSingleRoute,
  onFetchRoutes,
  onDeleteRoute
} from '../worker/router.worker';

function* handleRouteCreate() {
  yield takeLatest(createRoute, onCreateRoute);
}

function* handleRoutesCreate() {
  yield takeLatest(createMultipleRoutes, onCreateRoutes);
}

function* handleRouteUpdate() {
  yield takeLatest(updateRoute, onUpdateRoute);
}

function* handleRouteSingleFetch() {
  yield takeLatest(getSingleRoute, onFetchSingleRoute);
}

function* handleRoutesFetch() {
  yield takeLatest(fetchRoutes, onFetchRoutes);
}

function* handleRouteDelete() {
  yield takeLatest(deleteRoute, onDeleteRoute);
}

export default function*() {
  yield all({
    handleRouteCreate,
    handleRoutesCreate,
    handleRouteDelete,
    handleRoutesFetch,
    handleRouteSingleFetch,
    handleRouteUpdate
  });
}
