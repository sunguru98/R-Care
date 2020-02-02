import { ValidationError } from './userReducer.type';

export interface RouteSingleResponse {
  statusCode: 201 | 200;
  route: ExtendedRoute;
}

export interface RouteMultiResponse {
  statusCode: 201 | 200;
  routes: Route[];
}
export interface BatchError {
  error: string;
  prop: string;
  rowNumber: number;
  recievedValue: string;
}

type Longitude = number;
type Latitude = number;

export interface Stop {
  name: string;
  location: {
    type: 'Point';
    coordinates: [Longitude, Latitude];
  };
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
  routes: Route[] | null;
  route: ExtendedRoute | null;
  routeLoading: boolean;
  errors: ValidationError[] | BatchError[] | null;
}
