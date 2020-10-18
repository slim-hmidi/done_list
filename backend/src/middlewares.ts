/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import { errorMessages } from './constants/httpUtils';

declare module 'express-serve-static-core' {
  // eslint-disable-next-line no-shadow
  interface Request {
    userId: string;
  }
}

export class ErrorHandler extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandlerMiddleware = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
  next();
};

export const schemaValidator = (schema: any, path: keyof Request) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await schema.validate(req[path]);
    return next();
  } catch (error) {
    const err = new ErrorHandler(400, error.message);
    return next(err);
  }
};

export const schemaUpdateValidator = (shape: any, props: string[]) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existantProps = props
      .filter((prop) => Object.prototype.hasOwnProperty.call(req.body, prop));
    if (!existantProps.length) {
      throw new ErrorHandler(400, 'Update body should not be null');
    }
    const filtredSchema = Object.keys(existantProps).reduce(
      (acc: any, curr) => {
        const result = acc;
        result[curr] = shape[curr];
        return result;
      },
      {},
    );
    const schema = yup.object().shape(filtredSchema);
    await schema.validate(req.body);
    return next();
  } catch (error) {
    const err = new ErrorHandler(400, error.message);
    return next(err);
  }
};

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
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
