import { TUser } from './src/types';

declare global {
  module Express {
    export interface Request {
      accessToken: string;
      user: TUser;
    }
  }
}
