import { Request, Response, NextFunction } from "express";

class ErrorHandler extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandlerMiddleware = (
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
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export const schemaValidator = (schema: any, path: keyof Request) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await schema.validate(req[path]);
      next();
    } catch (error) {
      const err = new ErrorHandler(400, error.message);
      next(err);
    }
  };

export {
  notFound,
  errorHandlerMiddleware,
  ErrorHandler,
};
