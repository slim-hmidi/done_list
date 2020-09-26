import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import { errorMessages } from "./constants/httpUtils";

declare module "express-serve-static-core" {
  interface Request {
    userId: string;
  }
}

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

export const schemaUpdateValidator = (shape: any, props: string[]) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const existantProps = props.filter((prop) =>
        req.body.hasOwnProperty(prop)
      );
      if (!existantProps.length) {
        throw new ErrorHandler(400, "Update body should not be null");
      }
      let filtredSchema = {} as any;
      for (let key of existantProps) {
        filtredSchema[key] = shape[key];
      }
      const schema = yup.object().shape(filtredSchema);
      await schema.validate(req.body);
      next();
    } catch (error) {
      const err = new ErrorHandler(400, error.message);
      next(err);
    }
  };

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET as jwt.Secret;
  if (process.env.NODE_ENV === "test") {
    return next();
  }
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send(errorMessages.tokenRequired);
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

export {
  notFound,
  errorHandlerMiddleware,
  checkToken,
  ErrorHandler,
};
