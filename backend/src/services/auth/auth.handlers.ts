import { NextFunction, Request, Response } from 'express';
import Authentication from './auth.service';

export const signInHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const authentication = new Authentication();
    const { message, data } = await authentication.signIn(username, password);
    return res.status(200).json({ message, data });
  } catch (error) {
    return next(error);
  }
};

export const signUpHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authentication = new Authentication();
    const { message, data } = await authentication.signUp(req.body);
    return res.status(200).json({ message, data });
  } catch (error) {
    return next(error);
  }
};
