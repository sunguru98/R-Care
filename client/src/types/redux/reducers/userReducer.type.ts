export interface UserServerResponse extends UserState {
  statusCode: 200 | 201;
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
  expiresIn: string | null;
  userLoading: boolean;
}
