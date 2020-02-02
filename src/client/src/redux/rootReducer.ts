import routeReducer from './reducers/routeReducer';
import userReducer from './reducers/userReducer';
import { combineReducers } from 'redux';
import { UserState } from '../types/redux/reducers/userReducer.type';
import { RouteState } from '../types/redux/reducers/routeReducer.type';

export default combineReducers<{ user: UserState; route: RouteState }>({
  user: userReducer,
  route: routeReducer
});
