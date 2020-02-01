import { ValidationError } from 'express-validator';

export interface JWT_PAYLOAD {
  _id: string;
  email: string;
}

export interface ErrorMessage {
  statusCode: 400 | 401 | 404 | 500;
  message: string | ValidationError[];
}
