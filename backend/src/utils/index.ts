import * as jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/users";
import { Model } from "objection";

export const formatStringCase = (
  fn: (arg: any) => string | object,
  arg: any,
) => {
  if (arg.constructor === String) {
    return fn(arg);
  }

  if (
    arg.constructor === Object || Array.isArray(arg) || arg instanceof Model
  ) {
    let result = {};
    for (let key in arg) {
      const formattedCase = formatStringCase(fn, key) as string;
      switch (arg[key].constructor) {
        case Array:
          for (let k of arg[key]) {
            Object.assign(
              result,
              { [formattedCase]: [].concat(formatStringCase(fn, k) as any) },
            );
          }

          break;
        case Object:
          Object.assign(
            result,
            { [formattedCase]: formatStringCase(fn, arg[key]) },
          );
          break;
        default:
          Object.assign(result, { [formattedCase]: arg[key] });
          break;
      }
    }
    return result;
  }
};
export const snakeToCamelCase = (input: string) => {
  if (input.indexOf("_") === -1) return input;
  const strElements = input.split("_");
  const first = strElements[0];
  return strElements.slice(1).reduce(
    (acc, current) =>
      acc.concat(current.charAt(0).toUpperCase() + current.slice(1)),
    first,
  );
};

export const camelToSnakeCase = (input: string) =>
  input.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

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
