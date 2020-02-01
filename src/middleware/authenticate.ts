import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_PAYLOAD } from '../types/common.types';
import User from '../models/User';

const authenticate = async (
  req: Request,
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
    const user = await User.findOne({
      _id,
      accessToken: accessToken.replace('Bearer ', '')
    });
    if (!user) throw new Error('Invalid Credentials');
    req.user = user;
    req.accessToken = accessToken;
    next();
  } catch (err) {
    res.status(401).send({ statusCode: 401, message: err.message });
  }
};

export default authenticate;
