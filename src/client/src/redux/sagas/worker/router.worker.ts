import Axios, { AxiosError, AxiosResponse } from 'axios';
import {
  createRoute,
  createMultipleRoutes,
  updateRoute,
  deleteRoute,
  getSingleRoute
} from '../../actions/routeActions';
import { RouteServerError } from '../../../types/redux/sagas/route.type';
import {
  SetRouteLoadingAction,
  SetRoutesAction,
  SetRouteAction,
  ClearRouteErrorsAction,
  SetRouteErrorsAction
} from '../../../types/redux/actions/routeActions.type';
import { call, put } from 'redux-saga/effects';
import {
  RouteMultiResponse,
  RouteSingleResponse,
  BatchError
} from '../../../types/redux/reducers/routeReducer.type';
import { ValidationError } from '../../../types/redux/reducers/userReducer.type';

export function* onFetchRoutes() {
  try {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: true
    });
    const { data }: AxiosResponse<RouteMultiResponse> = yield call(() =>
      Axios.get<RouteMultiResponse>('/routes')
    );
    // console.log(data)
    yield put<SetRoutesAction>({ type: 'SET_ROUTES', payload: data.routes });
  } catch (err) {
    const { response } = err as AxiosError<RouteServerError | string>;
    const message =
      (response?.data as RouteServerError).message ?? response?.data;
    yield alert(message);
  } finally {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: false
    });
  }
}

export function* onFetchSingleRoute({
  payload
}: ReturnType<typeof getSingleRoute>) {
  try {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: true
    });
    const { data }: AxiosResponse<RouteSingleResponse> = yield call(() =>
      Axios.get<RouteSingleResponse>(`/routes/${payload}`)
    );
    // console.log(data)
    yield put<SetRouteAction>({ type: 'SET_ROUTE', payload: data.route });
  } catch (err) {
    const { response } = err as AxiosError<RouteServerError | string>;
    const message =
      (response?.data as RouteServerError).message ?? response?.data;
    yield alert(message);
  } finally {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: false
    });
  }
}

export function* onCreateRoute({ payload }: ReturnType<typeof createRoute>) {
  try {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: true
    });
    yield call(() => Axios.post<RouteSingleResponse>('/routes', payload));
    // console.log(data)
    yield call(onFetchRoutes);
    yield alert('Route created successfully');
  } catch (err) {
    const { response } = err as AxiosError<RouteServerError | string>;
    const message = (response?.data as RouteServerError).message;
    if (typeof message !== 'string' && Array.isArray(message)) {
      yield put<ClearRouteErrorsAction>({ type: 'CLEAR_ROUTE_ERRORS' });
      yield put<SetRouteErrorsAction>({
        type: 'SET_ROUTE_ERRORS',
        payload: message as ValidationError[]
      });
    }
  } finally {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: false
    });
  }
}

export function* onCreateRoutes({
  payload
}: ReturnType<typeof createMultipleRoutes>) {
  try {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: true
    });
    yield call(() => Axios.post<RouteMultiResponse>('/routes', payload));
    // console.log(data)
    yield call(onFetchRoutes);
    yield alert('Routes uploaded successfully');
  } catch (err) {
    const { response } = err as AxiosError<RouteServerError | string>;
    const message = (response?.data as RouteServerError).message;
    if (typeof message !== 'string' && Array.isArray(message)) {
      yield put<ClearRouteErrorsAction>({ type: 'CLEAR_ROUTE_ERRORS' });
      yield put<SetRouteErrorsAction>({
        type: 'SET_ROUTE_ERRORS',
        payload: message as BatchError[]
      });
    }
  } finally {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: false
    });
  }
}

export function* onUpdateRoute({
  payload: { id, route }
}: ReturnType<typeof updateRoute>) {
  try {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: true
    });
    yield call(() => Axios.put<RouteSingleResponse>(`/routes/${id}`, route));
    // console.log(data)
    yield call(onFetchRoutes);
    yield alert('Route updated successfully');
  } catch (err) {
    const { response } = err as AxiosError<RouteServerError | string>;
    const message = (response?.data as RouteServerError).message;
    if (typeof message !== 'string' && Array.isArray(message)) {
      yield put<ClearRouteErrorsAction>({ type: 'CLEAR_ROUTE_ERRORS' });
      yield put<SetRouteErrorsAction>({
        type: 'SET_ROUTE_ERRORS',
        payload: message as ValidationError[]
      });
    }
  } finally {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: false
    });
  }
}

export function* onDeleteRoute({ payload }: ReturnType<typeof deleteRoute>) {
  try {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: true
    });
    yield call(() => Axios.delete<RouteSingleResponse>(`/routes/${payload}`));
    // console.log(data)
    yield call(onFetchRoutes);
    yield alert('Route updated successfully');
  } catch (err) {
    const { response } = err as AxiosError<RouteServerError | string>;
    const message =
      (response?.data as RouteServerError).message ?? response?.data;
    yield alert(message);
  } finally {
    yield put<SetRouteLoadingAction>({
      type: 'SET_ROUTE_LOADING',
      payload: false
    });
  }
}