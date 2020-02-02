import {
  CREATE_ROUTE,
  CREATE_ROUTES,
  SET_ROUTE,
  SET_ROUTES,
  CLEAR_ROUTES,
  CLEAR_ROUTE,
  SET_ROUTE_LOADING,
  SET_ROUTE_ERRORS,
  CLEAR_ROUTE_ERRORS
} from '../actionTypes/route.types';
import {
  Route,
  ExtendedRoute,
  BatchError
} from '../reducers/routeReducer.type';
import { ValidationError } from '../reducers/userReducer.type';

interface CreateRouteAction {
  type: CREATE_ROUTE;
}

interface CreateRoutesAction {
  type: CREATE_ROUTES;
}

export interface SetRouteAction {
  type: SET_ROUTE;
  payload: ExtendedRoute;
}

export interface SetRoutesAction {
  type: SET_ROUTES;
  payload: Route[];
}

export interface SetRouteLoadingAction {
  type: SET_ROUTE_LOADING;
  payload: boolean;
}

interface ClearRoutesAction {
  type: CLEAR_ROUTES;
}

interface ClearRouteAction {
  type: CLEAR_ROUTE;
}

export interface SetRouteErrorsAction {
  type: SET_ROUTE_ERRORS;
  payload: ValidationError[] | BatchError[];
}

export interface ClearRouteErrorsAction {
  type: CLEAR_ROUTE_ERRORS;
}

export type RouteActions =
  | CreateRouteAction
  | CreateRoutesAction
  | SetRouteAction
  | SetRoutesAction
  | SetRouteLoadingAction
  | ClearRouteAction
  | ClearRoutesAction
  | SetRouteErrorsAction
  | ClearRouteErrorsAction;
