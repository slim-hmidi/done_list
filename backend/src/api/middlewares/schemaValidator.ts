import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import {ErrorHandler} from './errorHandler';
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