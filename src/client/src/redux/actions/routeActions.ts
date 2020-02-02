import { RouteInputRequest } from '../../types/redux/sagas/root.type';
import {
  CreateRouteAction,
  UpdateRouteAction,
  GetSingleRouteAction,
  DeleteRouteAction
} from '../../types/redux/actions/routeActions.type';

export const createRoute = (route: RouteInputRequest): CreateRouteAction => ({
  type: 'CREATE_ROUTE',
  payload: route
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
