import {
  CREATE_ROUTE,
  CREATE_ROUTES,
  SET_ROUTE,
  SET_ROUTES,
  CLEAR_ROUTES,
  CLEAR_ROUTE,
  SET_ROUTE_LOADING,
  SET_ROUTE_ERRORS,
  CLEAR_ROUTE_ERRORS,
  DELETE_ROUTE,
  UPDATE_ROUTE,
  GET_ROUTE,
  RESET_ROUTE_STATE,
  GET_ROUTES
} from '../actionTypes/route.types';
import {
  Route,
  ExtendedRoute,
  BatchError
} from '../reducers/routeReducer.type';
import { ValidationError } from '../reducers/userReducer.type';
import { RouteInputRequest } from '../sagas/route.type';

export interface CreateRouteAction {
  type: CREATE_ROUTE;
  payload: RouteInputRequest;
}

export interface CreateRoutesAction {
  type: CREATE_ROUTES;
  payload: FormData;
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

export interface DeleteRouteAction {
  type: DELETE_ROUTE;
  payload: string;
}

export interface UpdateRouteAction {
  type: UPDATE_ROUTE;
  payload: {
    id: string;
    route: RouteInputRequest;
  };
}

export interface GetSingleRouteAction {
  type: GET_ROUTE;
  payload: string;
}

export interface GetRoutesAction {
  type: GET_ROUTES;
}

export interface ResetRouteAction {
  type: RESET_ROUTE_STATE;
}

export type RouteActions =
  | CreateRouteAction
  | CreateRoutesAction
  | DeleteRouteAction
  | UpdateRouteAction
  | GetSingleRouteAction
  | GetRoutesAction
  | SetRouteAction
  | SetRoutesAction
  | SetRouteLoadingAction
  | ClearRouteAction
  | ClearRoutesAction
  | SetRouteErrorsAction
  | ClearRouteErrorsAction
  | ResetRouteAction;
