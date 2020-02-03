import { all, takeLatest } from 'redux-saga/effects';
import {
  onCreateRoute,
  onCreateRoutes,
  onUpdateRoute,
  onFetchSingleRoute,
  onFetchRoutes,
  onDeleteRoute
} from '../worker/router.worker';
import {
  CreateRouteAction,
  CreateRoutesAction,
  UpdateRouteAction,
  GetSingleRouteAction,
  GetRoutesAction,
  DeleteRouteAction
} from '../../../types/redux/actions/routeActions.type';

function* handleRouteCreate() {
  yield takeLatest<CreateRouteAction>("CREATE_ROUTE", onCreateRoute);
}

function* handleRoutesCreate() {
  yield takeLatest<CreateRoutesAction>("CREATE_ROUTES", onCreateRoutes);
}

function* handleRouteUpdate() {
  yield takeLatest<UpdateRouteAction>("UPDATE_ROUTE", onUpdateRoute);
}

function* handleRouteSingleFetch() {
  yield takeLatest<GetSingleRouteAction>("GET_ROUTE", onFetchSingleRoute);
}

function* handleRoutesFetch() {
  yield takeLatest<GetRoutesAction>("GET_ROUTES", onFetchRoutes);
}

function* handleRouteDelete() {
  yield takeLatest<DeleteRouteAction>("DELETE_ROUTE", onDeleteRoute);
}

export default function*() {
  yield all({
    handleRouteCreate: handleRouteCreate(),
    handleRoutesCreate: handleRoutesCreate(),
    handleRouteDelete: handleRouteDelete(),
    handleRoutesFetch: handleRoutesFetch(),
    handleRouteSingleFetch: handleRouteSingleFetch(),
    handleRouteUpdate: handleRouteUpdate()
  });
}
