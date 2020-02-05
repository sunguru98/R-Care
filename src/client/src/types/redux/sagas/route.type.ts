import { BatchError, StopUser } from '../reducers/routeReducer.type';
import { ValidationError } from '../reducers/userReducer.type';

export interface RouteInputRequest {
  name: string;
  stops: StopUser[];
  status: 'active' | 'inactive' | '';
  routeType: 'ac' | 'general' | '';
  direction: 'up' | 'down' | '';
}

export interface RouteServerError {
  statusCode: 400 | 404 | 500;
  message: string | ValidationError[] | BatchError[];
}
