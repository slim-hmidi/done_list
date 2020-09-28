import { NextFunction, Request, Response } from "express";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import {
  errorMessages,
  httpStatuscodes,
  successMessages,
} from "../constants/httpUtils";
import { ErrorHandler } from "../middlewares";
import { sign } from "../utils/tokenUtils";
import { TokenPayload } from "../interfaces/users";
import User from "../models/User";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const saltRound = 10;
    const { username, firstName, lastName, email, birthday, password } =
      req.body;

    const existantUser = await User.query()
      .where((builder) =>
        builder.where("email", email).orWhere("username", username)
      )
      .first();

    if (existantUser) {
      throw new ErrorHandler(
        httpStatuscodes.uniqueViolationError,
        errorMessages.userExists,
      );
    }

    const salt = genSaltSync(saltRound);
    const hash = hashSync(password, salt);

    const createdUser = await User.query().insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hash,
      username,
      birthday,
    });

    createdUser.password = "";

    const payload: TokenPayload = {
      id: createdUser.id,
      username,
      email,
    };

    const token = await sign(payload);
    return res.status(200).json({
      message: successMessages.userCreationSuccess,
      data: {
        userId: createdUser.id,
        username,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    const fetchedUser = await User.query().findOne({ username });
    if (!fetchedUser) {
      throw new ErrorHandler(403, errorMessages.invalidUsername);
    }

    const validPasswod = compareSync(password, fetchedUser.password);
    if (!validPasswod) {
      throw new ErrorHandler(403, errorMessages.wrongPassword);
    }
    const payload: TokenPayload = {
      id: fetchedUser.id,
      username,
      email: fetchedUser.email,
    };

    const token = await sign(payload);
    return res.status(200).json({
      message: successMessages.signInSuccess,
      data: {
        userId: fetchedUser.id,
        username,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
