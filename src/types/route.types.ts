import { Document, Model } from 'mongoose';
import { TUser } from './user.types';
import { TStop } from './stop.types';

export interface TRoute extends Document {
  name: string;
  direction: 'up' | 'down';
  user: TUser;
  status: 'active' | 'inactive';
  stops: TStop[];
  routeType: 'AC' | 'General';
}

export interface TRouteMethod extends TRoute {}
export interface TRouteStatic extends Model<TRouteMethod> {}
