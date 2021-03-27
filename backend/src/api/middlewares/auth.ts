import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from './errorHandler';
import { errorMessages } from 'constants/httpUtils';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  const token = req.headers['x-access-token'];
  if (!token) {
    return next(new ErrorHandler(403, errorMessages.tokenRequired));
  }

  return jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (error, decodedToken: any) => {
        if (error) {
          return res.status(401).send(errorMessages.tokenNotValid);
        }
        req.userId = decodedToken.id;
        return next();
      },
  );
};

export default checkToken;
