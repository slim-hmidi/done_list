import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorMessages } from "../constants/httpUtils";
import { TokenPayload } from "../interfaces/users";

declare module "express-serve-static-core" {
  interface Request {
    userId: string;
  }
}

const sign = (payload: TokenPayload) => {
  const secret = process.env.JWT_SECRET as jwt.Secret;
  const expiresIn = process.env.JWT_TOKEN_EXPIRY as string;
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {
      expiresIn,
    }, (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    });
  });
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

export { sign, checkToken };
