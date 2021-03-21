/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
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