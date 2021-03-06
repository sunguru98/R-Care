import { RouteInputRequest } from '../../types/redux/sagas/route.type';
import {
  CreateRouteAction,
  UpdateRouteAction,
  GetSingleRouteAction,
  DeleteRouteAction,
  GetRoutesAction,
  CreateRoutesAction,
  ClearRouteErrorsAction
} from '../../types/redux/actions/routeActions.type';

export const createRoute = (route: RouteInputRequest): CreateRouteAction => ({
  type: 'CREATE_ROUTE',
  payload: route
});

export const createMultipleRoutes = (data: FormData): CreateRoutesAction => ({
  type: 'CREATE_ROUTES',
  payload: data
});

export const fetchRoutes = (): GetRoutesAction => ({
  type: 'GET_ROUTES'
});

export const updateRoute = (
  route: RouteInputRequest,
  id: string
): UpdateRouteAction => ({
  type: 'UPDATE_ROUTE',
  payload: { id, route }
});

export const getSingleRoute = (id: string): GetSingleRouteAction => ({
  type: 'GET_ROUTE',
  payload: id
});

export const deleteRoute = (id: string): DeleteRouteAction => ({
  type: 'DELETE_ROUTE',
  payload: id
});

export const clearRouteErrors = (): ClearRouteErrorsAction => ({
  type: 'CLEAR_ROUTE_ERRORS'
});
