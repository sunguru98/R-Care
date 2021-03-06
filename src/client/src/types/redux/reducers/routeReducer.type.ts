import { ValidationError } from './userReducer.type';

export interface RouteSingleResponse {
  statusCode: 201 | 200;
  route: ExtendedRoute;
}

export interface RouteMultiResponse {
  statusCode: 201 | 200;
  routes: Route[] | ExtendedRoute[];
}
export interface BatchError {
  error: string;
  prop: string;
  rowNumber: number;
  recievedValue: string;
}

type Longitude = number;
type Latitude = number;

export interface StopUser {
  name: string;
  location: {
    type: 'Point';
    coordinates: [Longitude, Latitude];
  };
}

export interface Stop extends StopUser {
  _id: string;
}

export interface Route {
  _id: string;
  name: string;
  user: string;
  status: 'active' | 'inactive';
}

export interface ExtendedRoute extends Route {
  stops: Stop[];
  direction: 'up' | 'down';
  routeType: 'ac' | 'general';
}

export interface RouteState {
  routes: Route[] | ExtendedRoute[] | null;
  route: ExtendedRoute | null;
  routeLoading: boolean;
  errors: ValidationError[] | BatchError[] | null;
}
