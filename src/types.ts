import { Document, Model } from 'mongoose';
import { ValidationError } from 'express-validator';

export interface UserRegisterRequest {
  name: string;
  password: string;
  email: string;
}

export interface UserResponse {
  statusCode: 201 | 200;
  user: TUser;
  accessToken: string;
  expiresIn: string;
}

export interface UserLogoutResponse {
  statusCode: 202;
  message: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface TUser extends Document {
  name: string;
  accessToken: string | null;
  password: string;
  email: string;
  routes: TRoute[];
}

export interface TUserMethod extends TUser {
  getAccessToken: () => Promise<string>;
}

export interface TUserStatic extends Model<TUserMethod> {
  // statics
  findByEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<TUserMethod | null>;
}

export interface TStop extends Document {
  name: string;
  latitude: number;
  longitude: number;
}

export interface TRoute extends Document {
  name: string;
  direction: 'up' | 'down';
  user: TUser;
  status: 'active' | 'inactive';
  stops: TStop[];
  routeType: 'AC' | 'General';
}

export interface JWT_PAYLOAD {
  _id: string;
  email: string;
}

export interface ErrorMessage {
  statusCode: 400 | 401 | 404 | 500;
  message: string | ValidationError[];
}
