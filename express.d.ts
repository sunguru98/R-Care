import { TUser } from './src/types/user.types';

declare global {
  module Express {
    export interface Request {
      accessToken: string;
      user: TUser;
    }
  }
}
