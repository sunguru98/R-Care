import { Document, Model, Schema } from 'mongoose';
import { TUser } from './user.types';
import { TStop } from './stop.types';

export interface TRoute extends Document, RouteRequest {
  user: TUser;
}

export interface TMiniRoute {
  _id: Schema.Types.ObjectId;
  user: TUser;
  name: string;
  status: 'active' | 'inactive';
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
  routes: TMiniRoute[];
}

export interface TRouteMethod extends TRoute {}
export interface TRouteStatic extends Model<TRouteMethod> {}
