import { ValidationError } from '../reducers/userReducer.type';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export interface UserServerError {
  statusCode: 400 | 500;
  message: string | ValidationError[];
}
