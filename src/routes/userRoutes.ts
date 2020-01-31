import { Router, Request, Response } from 'express';
import { UserSuccess, UserRegisterRequest, UserLoginRequest } from '../types';
import authenticate from '../middleware/authenticate'
const router: Router = Router();

// @route - POST /user/signup
// @desc - Registers a user
// @access - Public
router.post<{}, UserSuccess, UserRegisterRequest>(
  '/signup',
  async (req: Request, res: Response): Promise<void> => {}
);

// @route - POST /user/login
// @desc - Registers a user
// @access - Public
router.post<{}, UserSuccess, UserLoginRequest>(
  '/login',
  async (req: Request, res: Response): Promise<void> => {}
);

// @route - DELETE /user/logout
// @desc - Log out user.
// @access - Private (Auth)
router.delete<{ accessToken: string }, { message: string }, {}>(
  '/logout',
  authenticate,
  async (req: Request, res: Response): Promise<void> => {}
);

export default router;
