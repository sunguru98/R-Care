import { Model, Document } from 'mongoose';
import { TRoute } from './route.types';

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
