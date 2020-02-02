export interface UserServerResponse {
  statusCode: 200 | 201;
  user: User;
  accessToken: string;
  expiresIn: string;
}

export interface ValidationError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  routes: string[];
}

export interface UserState {
  user: User | null;
  accessToken: string | null;
  userLoading: boolean;
  errors: ValidationError[] | null;
}
