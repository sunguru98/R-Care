import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_PAYLOAD } from '../types';

const authenticate = async (
  req: Request<{}>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Finding the accessToken
    const accessToken = req.header('Authorization');
    if (!accessToken) throw new Error('Invalid Credentials');
    const { _id } = verify(
      accessToken.replace('Bearer ', ''),
      process.env.JWT_SECRET_KEY!
    ) as JWT_PAYLOAD;
    
  } catch (err) {
    res.send();
  }
};

export default authenticate;
