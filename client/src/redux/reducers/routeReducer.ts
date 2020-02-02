import { RouteState } from '../../types/redux/reducers/routeReducer.type';
import {
  SetRouteAction,
  SetRoutesAction,
  RouteActions,
  SetRouteLoadingAction
} from '../../types/redux/actions/routeActions.type';

const initialState: RouteState = {
  routes: null,
  route: null,
  routeLoading: false
};

export default (state: RouteState = initialState, action: RouteActions) => {
  const { type } = action;
  const {
    payload: { name, stops, status, routeType, _id, direction, user }
  } = <SetRouteAction>action;
  const { payload } = <SetRoutesAction>action;
  switch (type) {
    case 'SET_ROUTE':
      return <RouteState>{
        ...state,
        route: { name, stops, status, routeType, _id, direction, user }
      };
    case 'SET_ROUTES':
      return <RouteState>{
        ...state,
        routes: [...payload]
      };
    case 'SET_ROUTE_LOADING':
      return <RouteState>{
        ...state,
        routeLoading: (action as SetRouteLoadingAction).payload
      };
    case 'CLEAR_ROUTE':
      return <RouteState>{ ...state, route: null };
    case 'CLEAR_ROUTES':
      return <RouteState>{ ...state, routes: null };
    default:
      return state;
  }
};
