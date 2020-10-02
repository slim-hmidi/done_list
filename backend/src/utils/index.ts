import * as jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/users";

export const snakeToCamelCase = (input: any) => {
  if (input.constructor === String) {
    if (input.indexOf("_") === -1) return input;
    const strElements = input.split("_");
    const first = strElements[0];
    return strElements.slice(1).reduce(
      (acc, current) =>
        acc.concat(current.charAt(0).toUpperCase() + current.slice(1)),
      first,
    );
  }

  if (input.constructor === Object) {
    let result = {};
    for (let key in input) {
      const camelCaseKey = snakeToCamelCase(key);
      Object.assign(result, { [camelCaseKey as string]: input[key] });
    }
    return result;
  }
  return;
};

export const sign = (payload: TokenPayload) => {
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
