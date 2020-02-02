import { Document, Model } from 'mongoose';
import { TUser } from './user.types';
import { TStop } from './stop.types';

export interface TRoute extends Document, RouteRequest {
  user: TUser;
}

export interface RouteRequest {
  name: string;
  direction: 'up' | 'down';
  status: 'active' | 'inactive';
  stops: TStop[];
  routeType: 'AC' | 'General';
}

export interface RouteResponse {
  statusCode: 201 | 200;
  route: TRoute;
}

export interface RoutesResponse {
  statusCode: 201 | 200;
  routes: TRoute[];
}

export interface TRouteMethod extends TRoute {}
export interface TRouteStatic extends Model<TRouteMethod> {}
