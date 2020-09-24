import * as jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/users";

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

export { sign };
