import { RouteState } from '../../types/redux/reducers/routeReducer.type';
import {
  SetRouteAction,
  SetRoutesAction,
  RouteActions,
  SetRouteLoadingAction,
  SetRouteErrorsAction
} from '../../types/redux/actions/routeActions.type';

const initialState: RouteState = {
  routes: null,
  route: null,
  routeLoading: false,
  errors: null
};

export default (state: RouteState = initialState, action: RouteActions) => {
  const { type } = action;
  const { payload: routePayload } = action as SetRouteAction;
  const { payload } = action as SetRoutesAction;
  switch (type) {
    case 'SET_ROUTE':
      return {
        ...state,
        route: {
          name: routePayload.name,
          stops: routePayload.stops,
          status: routePayload.status,
          routeType: routePayload.routeType,
          _id: routePayload._id,
          direction: routePayload.direction,
          user: routePayload.user
        }
      } as RouteState;
    case 'SET_ROUTES':
      return {
        ...state,
        routes: [...payload]
      } as RouteState;
    case 'SET_ROUTE_LOADING':
      return {
        ...state,
        routeLoading: (action as SetRouteLoadingAction).payload
      } as RouteState;
    case 'SET_ROUTE_ERRORS':
      return {
        ...state,
        errors: (action as SetRouteErrorsAction).payload
      } as RouteState;
    case 'CLEAR_ROUTE_ERRORS':
      return { ...state, errors: null } as RouteState;
    case 'CLEAR_ROUTE':
      return { ...state, route: null } as RouteState;
    case 'CLEAR_ROUTES':
      return { ...state, routes: null } as RouteState;
    case 'RESET_ROUTE_STATE':
      return {
        route: null,
        routes: null,
        routeLoading: false,
        errors: null
      } as RouteState;
    default:
      return state;
  }
};
